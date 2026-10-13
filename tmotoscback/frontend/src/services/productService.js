const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3333";

async function request(endpoint) {
  const response = await fetch(
    `${API_URL}${endpoint}`
  );

  if (!response.ok) {
    const errorData =
      await response
        .json()
        .catch(() => null);

    const message =
      errorData?.message ||
      "Erro ao acessar a API.";

    const error =
      new Error(message);

    error.status =
      response.status;

    throw error;
  }

  return response.json();
}

export async function getProducts() {
  return request(
    "/api/v1/products"
  );
}

export async function getProductBySlug(
  slug
) {
  try {
    return await request(
      `/api/v1/products/${slug}`
    );
  } catch (error) {
    if (error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function getProductsByCategory(
  category
) {
  const products =
    await getProducts();

  if (
    !category ||
    category === "Todos"
  ) {
    return products;
  }

  return products.filter(
    (product) =>
      product.category ===
      category
  );
}

export async function getProductsByIds(
  ids = []
) {
  if (!ids.length) {
    return [];
  }

  const products =
    await getProducts();

  return products.filter(
    (product) =>
      ids.includes(product.id)
  );
}

export async function getFeedProducts() {
  const products =
    await getProducts();

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