import products from "../data/products";

export async function getProducts() {
  return products;
}

export async function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}

export async function getProductsByCategory(category) {
  if (!category || category === "Todos") {
    return products;
  }

  return products.filter(
    (product) => product.category === category
  );
}