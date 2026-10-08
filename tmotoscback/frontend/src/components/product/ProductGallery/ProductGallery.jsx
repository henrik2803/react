import { useState } from "react";

import styles from "./ProductGallery.module.css";

function ProductGallery({ product }) {
  const images = [
    product.media?.cover,
    ...(product.media?.images ?? []),
  ].filter(Boolean);

  const uniqueImages = [
    ...new Set(images),
  ];

  const [selectedImage, setSelectedImage] =
    useState(uniqueImages[0] ?? "");

  if (!uniqueImages.length) {
    return (
      <div className={styles.empty}>
        Imagem indisponível
      </div>
    );
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <img
          src={selectedImage}
          alt={product.name}
        />
      </div>

      {uniqueImages.length > 1 && (
        <div className={styles.thumbnails}>
          {uniqueImages.map(
            (image, index) => {
              const isActive =
                image === selectedImage;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={
                    isActive
                      ? `${styles.thumbnail} ${styles.active}`
                      : styles.thumbnail
                  }
                  onClick={() =>
                    setSelectedImage(image)
                  }
                  aria-label={`Visualizar imagem ${
                    index + 1
                  } de ${product.name}`}
                >
                  <img
                    src={image}
                    alt=""
                  />
                </button>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;