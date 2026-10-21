import {
  formatBRL,
} from "./currency";

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

  const message = [
    "Olá! Tenho interesse neste produto:",
    "",
    `${product.brand} ${product.name}`,
    product.price
      ? `Preço: ${formatBRL(
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

  return buildWhatsAppUrl(
    message
  );
}

export function buildCartWhatsAppUrl(
  items,
  total
) {
  if (
    !Array.isArray(items) ||
    !items.length
  ) {
    return null;
  }

  const lines = [
    "Olá!",
    "",
    "Gostaria de finalizar este pedido:",
    "",
  ];

  items.forEach(
    (item, index) => {
      const {
        product,
        variant,
        color,
        quantity,
      } = item;

      const itemTotal =
        Number(
          product.price
        ) * quantity;

      lines.push(
        `${index + 1}. ${product.brand} ${product.name}`
      );

      if (color?.name) {
        lines.push(
          `Cor: ${color.name}`
        );
      }

      if (variant?.size) {
        lines.push(
          `Tamanho: ${variant.size}`
        );
      }

      lines.push(
        `Quantidade: ${quantity}`,
        `Valor unitário: ${formatBRL(
          Number(
            product.price
          )
        )}`,
        `Subtotal: ${formatBRL(
          itemTotal
        )}`,
        `${window.location.origin}/produto/${product.slug}`,
        ""
      );
    }
  );

  lines.push(
    `Total do pedido: ${formatBRL(
      total
    )}`,
    "",
    "Entrega/frete: a combinar.",
    "",
    "Gostaria de confirmar disponibilidade e finalizar a compra."
  );

  return buildWhatsAppUrl(
    lines.join("\n")
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