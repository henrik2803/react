import products from "../data/products";

export async function getProducts() {
  return products;
}

export async function getProductBySlug(slug) {
  return products.find(
    (product) => product.slug === slug
  );
}

export async function getProductsByCategory(
  category
) {
  if (
    !category ||
    category === "Todos"
  ) {
    return products;
  }

  return products.filter(
    (product) =>
      product.category === category
  );
}

export async function getProductsByIds(
  ids = []
) {
  if (!ids.length) {
    return [];
  }

  return products.filter(
    (product) =>
      ids.includes(product.id)
  );
}

export async function getFeedProducts() {
  return products
    .filter(
      (product) =>
        product.feed?.enabled
    )
    .sort(
      (a, b) =>
        (a.feed?.order ?? 999) -
        (b.feed?.order ?? 999)
    );
}