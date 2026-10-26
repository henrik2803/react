import type {
  FastifyReply,
  FastifyRequest,
} from "fastify";

export async function authenticateAdmin(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const payload =
      await request.jwtVerify<{
        role?: string;
        email?: string;
      }>({
        /*
         * Muito importante:
         *
         * o JWT administrativo agora
         * é aceito SOMENTE pelo cookie.
         */
        onlyCookie: true,
      });

    if (
      payload.role !==
      "admin"
    ) {
      return reply
        .status(403)
        .send({
          message:
            "Acesso não autorizado.",
        });
    }
  } catch {
    return reply
      .status(401)
      .send({
        message:
          "Sessão inválida ou expirada.",
      });
  }
}