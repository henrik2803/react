const WHATSAPP_NUMBER =
  import.meta.env
    .VITE_WHATSAPP_NUMBER ||
  "";

function normalizePhone(
  value
) {
  return String(
    value || ""
  ).replace(
    /\D/g,
    ""
  );
}

export function hasWhatsAppNumber() {
  return Boolean(
    normalizePhone(
      WHATSAPP_NUMBER
    )
  );
}

export function buildProductWhatsAppUrl(
  product
) {
  const phone =
    normalizePhone(
      WHATSAPP_NUMBER
    );

  if (!phone) {
    return null;
  }

  const productUrl =
    `${window.location.origin}/produto/${product.slug}`;

  const message = [
    "Olá! Tenho interesse neste produto:",
    "",
    `${product.brand} ${product.name}`,
    product.price
      ? `Preço: ${new Intl.NumberFormat(
          "pt-BR",
          {
            style:
              "currency",
            currency:
              "BRL",
          }
        ).format(
          Number(
            product.price
          )
        )}`
      : null,
    "",
    productUrl,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    `https://wa.me/${phone}` +
    `?text=${encodeURIComponent(
      message
    )}`
  );
}

export function openProductWhatsApp(
  product
) {
  const url =
    buildProductWhatsAppUrl(
      product
    );

  if (!url) {
    return false;
  }

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

  return true;
}