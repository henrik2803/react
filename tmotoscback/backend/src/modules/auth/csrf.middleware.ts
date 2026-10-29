import type {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import {
  env,
} from "../../config/env.js";

/*
 * =====================================================
 * CONFIGURAÇÃO
 * =====================================================
 *
 * Apenas o frontend configurado no
 * ambiente poderá iniciar operações
 * protegidas.
 */

const TRUSTED_ORIGIN =
  new URL(
    env.FRONTEND_URL
  ).origin;

/*
 * Métodos que não devem
 * alterar dados.
 */

const SAFE_METHODS =
  new Set([
    "GET",
    "HEAD",
    "OPTIONS",
  ]);

/*
 * =====================================================
 * PROTEÇÃO CONTRA CSRF
 * =====================================================
 */

export async function requireTrustedOrigin(
  request: FastifyRequest,
  reply: FastifyReply
) {
  /*
   * Requisições de leitura e
   * preflight não precisam
   * desta validação.
   */

  if (
    SAFE_METHODS.has(
      request.method
    )
  ) {
    return;
  }

  /*
   * Origin é enviado
   * automaticamente pelo
   * navegador em requisições
   * cross-origin POST/PATCH.
   */

  const requestOrigin =
    request.headers.origin;

  /*
   * A comparação precisa ser
   * exata.
   *
   * Também bloqueamos:
   * - Origin ausente;
   * - Origin: null;
   * - outros domínios;
   * - outras portas;
   * - protocolos diferentes.
   */

  if (
    requestOrigin !==
    TRUSTED_ORIGIN
  ) {
    request.log.warn(
      {
        method:
          request.method,

        originPresent:
          typeof requestOrigin ===
          "string",
      },
      "Operação bloqueada pela proteção CSRF."
    );

    return reply
      .status(403)
      .send({
        message:
          "Origem da requisição não autorizada.",
      });
  }
}