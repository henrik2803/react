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

    error.status = response.status;
    error.data = data;

    throw error;
  }

  return data;
}

function authHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

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