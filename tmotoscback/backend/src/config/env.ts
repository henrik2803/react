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