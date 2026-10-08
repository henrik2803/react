import {
  Heart,
  MessageCircle,
  X,
} from "lucide-react";

import Button from "../../ui/Button/Button";

import { formatBRL } from "../../../utils/currency";

import styles from "./ProductQuickView.module.css";

function ProductQuickView({
  product,
  onClose,
}) {
  if (!product) {
    return (
      <aside className={styles.empty}>
        <span>Selecione um produto</span>

        <p>
          Clique em um item do catálogo para
          visualizar os detalhes rápidos.
        </p>
      </aside>
    );
  }

  const isMoto = product.type === "moto";

  return (
    <>
      <button
        type="button"
        className={styles.backdrop}
        onClick={onClose}
        aria-label="Fechar detalhes do produto"
      />

      <aside className={styles.quickView}>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Fechar detalhes"
        >
          <X size={20} />
        </button>

        <div className={styles.mobileHandle} />

        <div className={styles.media}>
          <img
            src={product.media.cover}
            alt={product.name}
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <span className={styles.brand}>
            {product.brand}
          </span>

          <h2 className={styles.name}>
            {product.name}
          </h2>

          <p className={styles.description}>
            {product.shortDescription}
          </p>

          <div className={styles.priceArea}>
            {product.oldPrice && (
              <span className={styles.oldPrice}>
                {formatBRL(product.oldPrice)}
              </span>
            )}

            <strong className={styles.price}>
              {formatBRL(product.price)}
            </strong>
          </div>

          <div className={styles.actions}>
            {isMoto ? (
              <>
                <Button>
                  Solicitar proposta
                </Button>

                {product.sales?.testRide && (
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

              {product.sales?.whatsapp && (
                <Button variant="ghost">
                  <MessageCircle size={18} />

                  WhatsApp
                </Button>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default ProductQuickView;