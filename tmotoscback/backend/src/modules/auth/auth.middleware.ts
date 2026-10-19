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
      }>();

    if (payload.role !== "admin") {
      return reply.status(403).send({
        message: "Acesso não autorizado.",
      });
    }
  } catch {
    return reply.status(401).send({
      message: "Token inválido ou expirado.",
    });
  }
}
