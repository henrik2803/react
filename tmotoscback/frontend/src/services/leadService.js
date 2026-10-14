const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3333";

async function post(endpoint, data) {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(data),
    }
  );

  const responseData =
    await response
      .json()
      .catch(() => null);

  if (!response.ok) {
    const message =
      responseData?.message ||
      "Erro ao enviar solicitação.";

    const error =
      new Error(message);

    error.status =
      response.status;

    error.data =
      responseData;

    throw error;
  }

  return responseData;
}

export async function createQuoteLead(
  data
) {
  return post(
    "/api/v1/leads/quotes",
    data
  );
}

export async function createTestRideLead(
  data
) {
  return post(
    "/api/v1/leads/test-rides",
    data
  );
}