import type {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { z } from "zod";

import {
  env,
} from "../../config/env.js";

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

export async function loginController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parsed =
    loginSchema.safeParse(
      request.body
    );

  if (!parsed.success) {
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
        role: "admin",
        email:
          env.ADMIN_EMAIL,
      },
      {
        expiresIn: "8h",
      }
    );

  return reply
    .status(200)
    .send({
      token,
      expiresIn: "8h",
    });
}