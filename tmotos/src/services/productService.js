import products from "../data/products.json";

function normalizeText(text = "") {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export async function getProducts() {
  return products.filter((product) => product.stock?.available !== false);
}

export async function getAllProducts() {
  return products;
}

export async function getProductById(id) {
  return products.find(
    (product) => product.id === Number(id)
  );
}

export async function getProductBySlug(slug) {
  return products.find(
    (product) => product.slug === slug
  );
}

export async function getProductsByCategory(category) {
  if (!category || category === "todos") {
    return getProducts();
  }

  return products.filter(
    (product) =>
      product.stock?.available !== false &&
      product.category === category
  );
}

export async function getFeedProducts() {
  return products
    .filter(
      (product) =>
        product.feed?.enabled === true &&
        product.stock?.available !== false
    )
    .sort(
      (a, b) =>
        (a.feed?.order ?? 999) -
        (b.feed?.order ?? 999)
    );
}

export async function getFeaturedProducts() {
  return products.filter(
    (product) =>
      product.feed?.featured === true &&
      product.stock?.available !== false
  );
}

export async function searchProducts(searchTerm) {
  const term = normalizeText(searchTerm);

  if (!term) {
    return getProducts();
  }

  return products.filter((product) => {
    if (product.stock?.available === false) {
      return false;
    }

    const searchableContent = [
      product.name,
      product.brand,
      product.category,
      product.subcategory,
      ...(product.tags || [])
    ]
      .map(normalizeText)
      .join(" ");

    return searchableContent.includes(term);
  });
}