const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3333";

async function request(
  endpoint,
  options = {}
) {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    options
  );

  const data = await response
    .json()
    .catch(() => null);

  if (!response.ok) {
    const error = new Error(
      data?.message ||
        "Erro ao processar solicitação."
    );

    error.status =
      response.status;

    error.data =
      data;

    throw error;
  }

  return data;
}

function authHeaders(token) {
  return {
    Authorization:
      `Bearer ${token}`,

    "Content-Type":
      "application/json",
  };
}

/*
 * =====================================================
 * AUTENTICAÇÃO
 * =====================================================
 */

export async function adminLogin(
  email,
  password
) {
  return request(
    "/api/v1/auth/login",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );
}

/*
 * =====================================================
 * PROPOSTAS
 * =====================================================
 */

export async function getQuoteLeads(
  token
) {
  return request(
    "/api/v1/admin/leads/quotes",
    {
      headers:
        authHeaders(token),
    }
  );
}

export async function updateQuoteLeadStatus(
  id,
  status,
  token
) {
  return request(
    `/api/v1/admin/leads/quotes/${id}/status`,
    {
      method: "PATCH",

      headers:
        authHeaders(token),

      body: JSON.stringify({
        status,
      }),
    }
  );
}

/*
 * =====================================================
 * TEST RIDES
 * =====================================================
 */

export async function getTestRideLeads(
  token
) {
  return request(
    "/api/v1/admin/leads/test-rides",
    {
      headers:
        authHeaders(token),
    }
  );
}

export async function updateTestRideLeadStatus(
  id,
  status,
  token
) {
  return request(
    `/api/v1/admin/leads/test-rides/${id}/status`,
    {
      method: "PATCH",

      headers:
        authHeaders(token),

      body: JSON.stringify({
        status,
      }),
    }
  );
}

/*
 * =====================================================
 * PRODUTOS
 * =====================================================
 */

/*
 * Lista todos os produtos.
 *
 * Diferente da API pública,
 * esta rota também retorna
 * produtos inativos.
 */
export async function getAdminProducts(
  token
) {
  return request(
    "/api/v1/admin/products",
    {
      headers:
        authHeaders(token),
    }
  );
}

/*
 * Busca um produto pelo ID.
 */
export async function getAdminProduct(
  id,
  token
) {
  return request(
    `/api/v1/admin/products/${id}`,
    {
      headers:
        authHeaders(token),
    }
  );
}

/*
 * Cria um novo produto.
 *
 * Pode receber:
 * - informações básicas
 * - preços
 * - estoque
 * - vendas
 * - mídia
 * - feed
 * - SEO
 * - cores
 * - variantes
 */
export async function createAdminProduct(
  productData,
  token
) {
  return request(
    "/api/v1/admin/products",
    {
      method: "POST",

      headers:
        authHeaders(token),

      body:
        JSON.stringify(
          productData
        ),
    }
  );
}

/*
 * Atualiza um produto existente.
 *
 * O backend utiliza PATCH,
 * portanto podemos enviar somente
 * os campos que foram alterados.
 *
 * Quando houver alteração de
 * cores/variantes, as duas listas
 * devem ser enviadas juntas.
 */
export async function updateAdminProduct(
  id,
  productData,
  token
) {
  return request(
    `/api/v1/admin/products/${id}`,
    {
      method: "PATCH",

      headers:
        authHeaders(token),

      body:
        JSON.stringify(
          productData
        ),
    }
  );
}

/*
 * Ativa ou desativa produto.
 */
export async function updateAdminProductStatus(
  id,
  active,
  token
) {
  return request(
    `/api/v1/admin/products/${id}/status`,
    {
      method: "PATCH",

      headers:
        authHeaders(token),

      body:
        JSON.stringify({
          active,
        }),
    }
  );
}