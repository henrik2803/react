import type {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import {
  z,
} from "zod";

import {
  env,
} from "../../config/env.js";

import {
  ADMIN_SESSION_CLEAR_COOKIE_OPTIONS,
  ADMIN_SESSION_COOKIE_NAME,
  ADMIN_SESSION_COOKIE_OPTIONS,
} from "./auth.config.js";

import {
  validateAdminCredentials,
} from "./auth.service.js";

const loginSchema =
  z.object({
    email: z
      .string()
      .trim()
      .email(
        "Informe um e-mail válido."
      ),

    password: z
      .string()
      .min(
        1,
        "Informe a senha."
      )
      .max(200),
  });

/*
 * =====================================================
 * LOGIN
 * =====================================================
 */

export async function loginController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parsed =
    loginSchema.safeParse(
      request.body
    );

  if (
    !parsed.success
  ) {
    return reply
      .status(400)
      .send({
        message:
          "Dados de login inválidos.",
      });
  }

  const {
    email,
    password,
  } = parsed.data;

  const valid =
    await validateAdminCredentials(
      email,
      password
    );

  if (!valid) {
    return reply
      .status(401)
      .send({
        message:
          "E-mail ou senha inválidos.",
      });
  }

  const token =
    request.server.jwt.sign(
      {
        sub: "admin",

        role:
          "admin",

        email:
          env.ADMIN_EMAIL,
      },
      {
        expiresIn:
          "8h",
      }
    );

  /*
   * O JWT não é mais retornado
   * no JSON.
   *
   * Ele fica armazenado somente
   * no cookie HttpOnly.
   */

  reply.setCookie(
    ADMIN_SESSION_COOKIE_NAME,
    token,
    ADMIN_SESSION_COOKIE_OPTIONS
  );

  reply.header(
    "Cache-Control",
    "no-store"
  );

  return reply
    .status(200)
    .send({
      authenticated:
        true,

      expiresIn:
        "8h",

      user: {
        email:
          env.ADMIN_EMAIL,

        role:
          "admin",
      },
    });
}

/*
 * =====================================================
 * VERIFICAR SESSÃO
 * =====================================================
 */

export async function sessionController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user =
    request.user as {
      email?: string;
      role?: string;
    };

  reply.header(
    "Cache-Control",
    "no-store"
  );

  return reply
    .status(200)
    .send({
      authenticated:
        true,

      user: {
        email:
          user.email ||
          env.ADMIN_EMAIL,

        role:
          "admin",
      },
    });
}

/*
 * =====================================================
 * LOGOUT
 * =====================================================
 */

export async function logoutController(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  reply.clearCookie(
    ADMIN_SESSION_COOKIE_NAME,
    ADMIN_SESSION_CLEAR_COOKIE_OPTIONS
  );

  reply.header(
    "Cache-Control",
    "no-store"
  );

  return reply
    .status(200)
    .send({
      message:
        "Sessão encerrada com sucesso.",
    });
}