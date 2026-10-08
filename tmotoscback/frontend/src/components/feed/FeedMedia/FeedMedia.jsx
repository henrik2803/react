import {
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./FeedMedia.module.css";

function FeedMedia({
  product,
  isActive,
  index,
}) {
  const videoRef = useRef(null);

  const [
    videoError,
    setVideoError,
  ] = useState(false);

  const videoUrl =
    product.media?.video;

  const cover =
    product.media?.cover;

  const hasVideo =
    Boolean(videoUrl) &&
    !videoError;

  useEffect(() => {
    const video =
      videoRef.current;

    if (!video) {
      return;
    }

    if (isActive) {
      const playPromise =
        video.play();

      if (
        playPromise !== undefined
      ) {
        playPromise.catch(() => {
          /*
           * Alguns navegadores podem
           * impedir autoplay.
           *
           * Como o vídeo está muted,
           * normalmente ele será
           * permitido.
           */
        });
      }

      return;
    }

    video.pause();
  }, [
    isActive,
    videoUrl,
  ]);

  if (hasVideo) {
    return (
      <div className={styles.media}>
        <video
          ref={videoRef}
          className={styles.video}
          src={videoUrl}
          poster={cover}
          muted
          loop
          playsInline
          preload={
            isActive
              ? "metadata"
              : "none"
          }
          onError={() =>
            setVideoError(true)
          }
        />
      </div>
    );
  }

  return (
    <div className={styles.media}>
      <img
        src={cover}
        alt={product.name}
        className={styles.image}
        loading={
          index === 0
            ? "eager"
            : "lazy"
        }
      />
    </div>
  );
}

export default FeedMedia;