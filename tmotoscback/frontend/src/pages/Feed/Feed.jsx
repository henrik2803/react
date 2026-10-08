import {
  useEffect,
  useRef,
  useState,
} from "react";

import FeedCard from "../../components/feed/FeedCard/FeedCard";

import {
  getFeedProducts,
} from "../../services/productService";

import styles from "./Feed.module.css";

function Feed() {
  const feedRef = useRef(null);

  const [products, setProducts] =
    useState([]);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [muted, setMuted] =
    useState(true);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadFeed() {
      try {
        setLoading(true);
        setError("");

        const data =
          await getFeedProducts();

        setProducts(data);
        setActiveIndex(0);
      } catch (error) {
        console.error(
          "Erro ao carregar feed:",
          error
        );

        setError(
          "Não foi possível carregar o feed."
        );
      } finally {
        setLoading(false);
      }
    }

    loadFeed();
  }, []);

  useEffect(() => {
    const feed =
      feedRef.current;

    if (
      !feed ||
      !products.length
    ) {
      return;
    }

    const cards =
      feed.querySelectorAll(
        "[data-feed-index]"
      );

    const observer =
      new IntersectionObserver(
        (entries) => {
          const visibleEntries =
            entries
              .filter(
                (entry) =>
                  entry.isIntersecting
              )
              .sort(
                (a, b) =>
                  b.intersectionRatio -
                  a.intersectionRatio
              );

          const mostVisible =
            visibleEntries[0];

          if (!mostVisible) {
            return;
          }

          if (
            mostVisible.intersectionRatio <
            0.55
          ) {
            return;
          }

          const index =
            Number(
              mostVisible.target
                .dataset.feedIndex
            );

          if (
            Number.isNaN(index)
          ) {
            return;
          }

          setActiveIndex(index);
        },
        {
          root: feed,

          threshold: [
            0.25,
            0.5,
            0.55,
            0.75,
            1,
          ],
        }
      );

    cards.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, [products]);

  function handleToggleMute() {
    setMuted(
      (currentMuted) =>
        !currentMuted
    );
  }

  function handleGoToFeedItem(
    index
  ) {
    const feed =
      feedRef.current;

    if (!feed) {
      return;
    }

    const target =
      feed.querySelector(
        `[data-feed-index="${index}"]`
      );

    target?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  if (loading) {
    return (
      <main
        className={
          styles.statusPage
        }
      >
        <div
          className={styles.status}
        >
          Carregando feed...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main
        className={
          styles.statusPage
        }
      >
        <div
          className={styles.status}
        >
          <h1>
            Não foi possível carregar
            o feed
          </h1>

          <p>{error}</p>
        </div>
      </main>
    );
  }

  if (!products.length) {
    return (
      <main
        className={
          styles.statusPage
        }
      >
        <div
          className={styles.status}
        >
          <h1>
            Nenhuma publicação
          </h1>

          <p>
            Ainda não existem produtos
            configurados para o feed.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      ref={feedRef}
      className={styles.feed}
    >
      {products.map(
        (product, index) => {
          const isActive =
            activeIndex === index;

          const shouldLoadVideo =
            Math.abs(
              activeIndex - index
            ) <= 1;

          return (
            <FeedCard
              key={product.id}
              product={product}
              index={index}
              total={products.length}
              isActive={isActive}
              shouldLoadVideo={
                shouldLoadVideo
              }
              muted={muted}
              onToggleMute={
                handleToggleMute
              }
            />
          );
        }
      )}

      {products.length > 1 && (
        <nav
          className={
            styles.progress
          }
          aria-label="Publicações do feed"
        >
          {products.map(
            (product, index) => (
              <button
                key={product.id}
                type="button"
                className={
                  activeIndex ===
                  index
                    ? `${styles.progressDot} ${styles.progressDotActive}`
                    : styles.progressDot
                }
                onClick={() =>
                  handleGoToFeedItem(
                    index
                  )
                }
                aria-label={`Ir para ${product.name}`}
                aria-current={
                  activeIndex ===
                  index
                    ? "true"
                    : undefined
                }
              />
            )
          )}
        </nav>
      )}
    </main>
  );
}

export default Feed;