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
  const feedRef =
    useRef(null);

  const [
    products,
    setProducts,
  ] = useState([]);

  const [
    activeProductId,
    setActiveProductId,
  ] = useState(null);

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

        if (data.length > 0) {
          setActiveProductId(
            String(data[0].id)
          );
        }
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
        "[data-feed-id]"
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

          if (
            !mostVisible ||
            mostVisible.intersectionRatio <
              0.6
          ) {
            return;
          }

          const id =
            mostVisible.target.dataset
              .feedId;

          setActiveProductId(id);
        },
        {
          root: feed,

          threshold: [
            0.5,
            0.6,
            0.75,
            0.9,
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
        (product, index) => (
          <FeedCard
            key={product.id}
            product={product}
            index={index}
            total={products.length}
            isActive={
              activeProductId ===
              String(product.id)
            }
          />
        )
      )}
    </main>
  );
}

export default Feed;