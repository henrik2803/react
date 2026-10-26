const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3333";

/*
 * =====================================================
 * REQUEST
 * =====================================================
 */

async function request(
  endpoint,
  options = {}
) {
  const response =
    await fetch(
      `${API_URL}${endpoint}`,
      {
        ...options,

        /*
         * Obrigatório para enviar
         * e receber o cookie HttpOnly.
         */
        credentials:
          "include",
      }
    );

  const data =
    await response
      .json()
      .catch(
        () => null
      );

  if (
    !response.ok
  ) {
    const error =
      new Error(
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

function jsonHeaders() {
  return {
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

      headers:
        jsonHeaders(),

      body:
        JSON.stringify({
          email,
          password,
        }),
    }
  );
}

export async function getAdminSession() {
  return request(
    "/api/v1/auth/session"
  );
}

export async function adminLogout() {
  return request(
    "/api/v1/auth/logout",
    {
      method:
        "POST",
    }
  );
}

/*
 * =====================================================
 * PROPOSTAS
 * =====================================================
 */

export async function getQuoteLeads() {
  return request(
    "/api/v1/admin/leads/quotes"
  );
}

export async function updateQuoteLeadStatus(
  id,
  status
) {
  return request(
    `/api/v1/admin/leads/quotes/${id}/status`,
    {
      method:
        "PATCH",

      headers:
        jsonHeaders(),

      body:
        JSON.stringify({
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

export async function getTestRideLeads() {
  return request(
    "/api/v1/admin/leads/test-rides"
  );
}

export async function updateTestRideLeadStatus(
  id,
  status
) {
  return request(
    `/api/v1/admin/leads/test-rides/${id}/status`,
    {
      method:
        "PATCH",

      headers:
        jsonHeaders(),

      body:
        JSON.stringify({
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

export async function getAdminProducts() {
  return request(
    "/api/v1/admin/products"
  );
}

export async function getAdminProduct(
  id
) {
  return request(
    `/api/v1/admin/products/${id}`
  );
}

export async function createAdminProduct(
  productData
) {
  return request(
    "/api/v1/admin/products",
    {
      method:
        "POST",

      headers:
        jsonHeaders(),

      body:
        JSON.stringify(
          productData
        ),
    }
  );
}

export async function updateAdminProduct(
  id,
  productData
) {
  return request(
    `/api/v1/admin/products/${id}`,
    {
      method:
        "PATCH",

      headers:
        jsonHeaders(),

      body:
        JSON.stringify(
          productData
        ),
    }
  );
}

export async function updateAdminProductStatus(
  id,
  active
) {
  return request(
    `/api/v1/admin/products/${id}/status`,
    {
      method:
        "PATCH",

      headers:
        jsonHeaders(),

      body:
        JSON.stringify({
          active,
        }),
    }
  );
}