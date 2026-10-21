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

export function buildWhatsAppUrl(
  message
) {
  const phone =
    normalizePhone(
      WHATSAPP_NUMBER
    );

  if (!phone) {
    return null;
  }

  const text =
    message ||
    "Olá! Vim pelo site da TMotos e gostaria de atendimento.";

  return (
    `https://wa.me/${phone}` +
    `?text=${encodeURIComponent(
      text
    )}`
  );
}

export function buildProductWhatsAppUrl(
  product
) {
  if (!product) {
    return buildWhatsAppUrl();
  }

  const productUrl =
    `${window.location.origin}/produto/${product.slug}`;

  const price =
    product.price
      ? new Intl.NumberFormat(
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
        )
      : null;

  const message = [
    "Olá! Tenho interesse neste produto:",
    "",
    `${product.brand} ${product.name}`,
    price
      ? `Preço: ${price}`
      : null,
    "",
    productUrl,
  ]
    .filter(Boolean)
    .join("\n");

  return buildWhatsAppUrl(
    message
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