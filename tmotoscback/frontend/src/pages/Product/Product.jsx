import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Heart,
  MessageCircle,
} from "lucide-react";

import Container from "../../components/layout/Container/Container";
import Button from "../../components/ui/Button/Button";

import { getProductBySlug } from "../../services/productService";
import { formatBRL } from "../../utils/currency";

import styles from "./Product.module.css";

function Product() {
  const { slug } = useParams();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        const data =
          await getProductBySlug(slug);

        if (!data) {
          setError(
            "Produto não encontrado."
          );

          return;
        }

        setProduct(data);
      } catch (error) {
        console.error(
          "Erro ao carregar produto:",
          error
        );

        setError(
          "Não foi possível carregar o produto."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <Container>
        <div className={styles.status}>
          Carregando produto...
        </div>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container>
        <div className={styles.status}>
          <h1>
            Produto não encontrado
          </h1>

          <p>
            {error}
          </p>

          <Link to="/catalogo">
            Voltar para o catálogo
          </Link>
        </div>
      </Container>
    );
  }

  const isMoto =
    product.type === "moto";

  return (
    <main className={styles.product}>
      <Container>
        <Link
          to="/catalogo"
          className={styles.back}
        >
          <ArrowLeft size={18} />

          Voltar ao catálogo
        </Link>

        <section className={styles.main}>
          <div className={styles.gallery}>
            <img
              src={product.media.cover}
              alt={product.name}
              className={styles.image}
            />
          </div>

          <div className={styles.info}>
            <span className={styles.brand}>
              {product.brand}
            </span>

            <h1 className={styles.name}>
              {product.name}
            </h1>

            <p
              className={
                styles.shortDescription
              }
            >
              {product.shortDescription}
            </p>

            {product.badges?.length > 0 && (
              <div className={styles.badges}>
                {product.badges.map(
                  (badge) => (
                    <span
                      key={badge}
                      className={
                        styles.badge
                      }
                    >
                      {badge}
                    </span>
                  )
                )}
              </div>
            )}

            <div className={styles.priceArea}>
              {product.oldPrice && (
                <span
                  className={
                    styles.oldPrice
                  }
                >
                  {formatBRL(
                    product.oldPrice
                  )}
                </span>
              )}

              <strong
                className={styles.price}
              >
                {formatBRL(
                  product.price
                )}
              </strong>

              {product.installment
                ?.enabled && (
                <span
                  className={
                    styles.installment
                  }
                >
                  {
                    product.installment
                      .installments
                  }
                  x de{" "}
                  {formatBRL(
                    product.installment
                      .value
                  )}
                </span>
              )}
            </div>

            {product.colors?.length >
              0 && (
              <div
                className={
                  styles.colorsArea
                }
              >
                <span
                  className={
                    styles.sectionLabel
                  }
                >
                  Cores disponíveis
                </span>

                <div
                  className={
                    styles.colors
                  }
                >
                  {product.colors.map(
                    (color) => (
                      <button
                        key={color.id}
                        type="button"
                        className={
                          styles.color
                        }
                        title={color.name}
                        aria-label={
                          color.name
                        }
                        style={{
                          background:
                            color.hex,
                        }}
                      />
                    )
                  )}
                </div>
              </div>
            )}

            <div className={styles.actions}>
              {isMoto ? (
                <>
                  <Button>
                    Solicitar proposta
                  </Button>

                  {product.sales
                    ?.testRide && (
                    <Button variant="secondary">
                      Agendar Test Ride
                    </Button>
                  )}
                </>
              ) : (
                <Button>
                  Adicionar ao carrinho
                </Button>
              )}

              <div
                className={
                  styles.secondaryActions
                }
              >
                <Button variant="ghost">
                  <Heart size={18} />

                  Favoritar
                </Button>

                {product.sales
                  ?.whatsapp && (
                  <Button variant="ghost">
                    <MessageCircle
                      size={18}
                    />

                    WhatsApp
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section
          className={styles.description}
        >
          <h2>Sobre o produto</h2>

          <p>
            {product.description}
          </p>
        </section>
      </Container>
    </main>
  );
}

export default Product;