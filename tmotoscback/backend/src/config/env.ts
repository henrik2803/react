import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce
    .number()
    .int()
    .positive()
    .default(3333),

  HOST: z
    .string()
    .default("0.0.0.0"),

  FRONTEND_URL: z
    .string()
    .url()
    .default(
      "http://localhost:5173"
    ),

  JWT_SECRET: z
    .string()
    .min(
      32,
      "JWT_SECRET deve ter pelo menos 32 caracteres."
    ),

  ADMIN_EMAIL: z
    .string()
    .email(),

  ADMIN_PASSWORD_HASH: z
    .string()
    .min(20),
});

const parsedEnv =
  envSchema.safeParse(
    process.env
  );

if (!parsedEnv.success) {
  console.error(
    "Variáveis de ambiente inválidas:"
  );

  console.error(
    parsedEnv.error.format()
  );

  process.exit(1);
}

export const env =
  parsedEnv.data;