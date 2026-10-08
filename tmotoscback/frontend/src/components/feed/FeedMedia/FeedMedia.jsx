import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Volume2,
  VolumeX,
} from "lucide-react";

import styles from "./FeedMedia.module.css";

function FeedMedia({
  product,
  isActive,
  shouldLoadVideo,
  muted,
  onToggleMute,
  index,
}) {
  const videoRef =
    useRef(null);

  const [
    videoError,
    setVideoError,
  ] = useState(false);

  const [
    showVideo,
    setShowVideo,
  ] = useState(false);

  const [
    videoFinished,
    setVideoFinished,
  ] = useState(false);

  const videoUrl =
    product.media?.video;

  const cover =
    product.media?.cover;

  const hasVideo =
    Boolean(videoUrl) &&
    !videoError;

  /*
   * Quando muda o vídeo,
   * limpamos os estados.
   */
  useEffect(() => {
    setVideoError(false);
    setVideoFinished(false);
    setShowVideo(false);
  }, [videoUrl]);

  /*
   * Quando a publicação entra
   * na tela:
   *
   * foto
   * ↓
   * 3 segundos
   * ↓
   * vídeo
   */
  useEffect(() => {
    if (
      !isActive ||
      !hasVideo ||
      !shouldLoadVideo ||
      videoFinished
    ) {
      setShowVideo(false);

      return;
    }

    setShowVideo(false);

    const timer =
      setTimeout(() => {
        setShowVideo(true);
      }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [
    isActive,
    hasVideo,
    shouldLoadVideo,
    product.id,
    videoFinished,
  ]);

  /*
   * Play / pause.
   */
  useEffect(() => {
    const video =
      videoRef.current;

    if (!video) {
      return;
    }

    video.muted = muted;
    video.volume =
      muted ? 0 : 1;

    if (
      !isActive ||
      !showVideo ||
      videoFinished
    ) {
      video.pause();

      return;
    }

    const playPromise =
      video.play();

    if (
      playPromise !== undefined
    ) {
      playPromise.catch(
        (error) => {
          console.log(
            "Não foi possível iniciar o vídeo:",
            error
          );
        }
      );
    }
  }, [
    isActive,
    showVideo,
    muted,
    videoFinished,
  ]);

  /*
   * Quando sai da publicação,
   * prepara tudo para quando
   * o usuário voltar.
   */
  useEffect(() => {
    const video =
      videoRef.current;

    if (isActive) {
      return;
    }

    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    setVideoFinished(false);
    setShowVideo(false);
  }, [isActive]);

  function handleVideoEnded() {
    const video =
      videoRef.current;

    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    setVideoFinished(true);
    setShowVideo(false);
  }

  function handleToggleSound() {
    const video =
      videoRef.current;

    if (!video) {
      return;
    }

    const nextMuted =
      !muted;

    video.muted =
      nextMuted;

    video.volume =
      nextMuted ? 0 : 1;

    if (
      !nextMuted &&
      showVideo
    ) {
      const playPromise =
        video.play();

      if (
        playPromise !== undefined
      ) {
        playPromise.catch(
          (error) => {
            console.log(
              "Não foi possível ativar o som:",
              error
            );
          }
        );
      }
    }

    onToggleMute();
  }

  /*
   * Produto sem vídeo.
   */
  if (!hasVideo) {
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

  return (
    <div className={styles.media}>
      <img
        src={cover}
        alt={product.name}
        className={`${styles.image} ${
          showVideo
            ? styles.imageHidden
            : ""
        }`}
        loading={
          index === 0
            ? "eager"
            : "lazy"
        }
      />

      {shouldLoadVideo && (
        <video
          ref={videoRef}
          className={`${styles.video} ${
            showVideo
              ? styles.videoVisible
              : ""
          }`}
          src={videoUrl}
          poster={cover}
          muted={muted}
          playsInline
          preload={
            isActive
              ? "auto"
              : "metadata"
          }
          onEnded={
            handleVideoEnded
          }
          onError={() => {
            setVideoError(true);
            setShowVideo(false);
          }}
        />
      )}

      {isActive &&
        showVideo && (
          <button
            type="button"
            className={
              styles.soundButton
            }
            onClick={
              handleToggleSound
            }
            aria-label={
              muted
                ? "Ativar som"
                : "Desativar som"
            }
            title={
              muted
                ? "Ativar som"
                : "Desativar som"
            }
          >
            {muted ? (
              <VolumeX
                size={20}
              />
            ) : (
              <Volume2
                size={20}
              />
            )}
          </button>
        )}
    </div>
  );
}

export default FeedMedia;