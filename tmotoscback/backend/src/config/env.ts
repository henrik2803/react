import "dotenv/config";

import {
  z,
} from "zod";

const envSchema =
  z
    .object({
      NODE_ENV: z
        .enum([
          "development",
          "test",
          "production",
        ])
        .default(
          "development"
        ),

      PORT: z.coerce
        .number()
        .int()
        .positive()
        .default(3333),

      HOST: z
        .string()
        .trim()
        .min(1)
        .default(
          "0.0.0.0"
        ),

      FRONTEND_URL: z
        .string()
        .trim()
        .url(
          "FRONTEND_URL inválida."
        )
        .transform(
          (value) =>
            value.replace(
              /\/+$/,
              ""
            )
        ),

      DATABASE_URL: z
        .string()
        .trim()
        .min(
          1,
          "DATABASE_URL não definida."
        ),

      JWT_SECRET: z
        .string()
        .min(
          32,
          "JWT_SECRET deve ter pelo menos 32 caracteres."
        ),

      ADMIN_EMAIL: z
        .string()
        .trim()
        .email(
          "ADMIN_EMAIL inválido."
        ),

      ADMIN_PASSWORD_HASH: z
        .string()
        .regex(
          /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/,
          "ADMIN_PASSWORD_HASH deve ser um hash bcrypt válido."
        ),

      /*
       * false no desenvolvimento local.
       *
       * Em produção dependerá do
       * provedor onde o backend
       * será hospedado.
       */
      TRUST_PROXY: z
        .enum([
          "true",
          "false",
        ])
        .default("false")
        .transform(
          (value) =>
            value === "true"
        ),
    })
    .superRefine(
      (
        data,
        context
      ) => {
        const secret =
          data.JWT_SECRET
            .toUpperCase();

        const insecureWords = [
          "SUBSTITUA",
          "CHANGE_ME",
          "TROQUE",
        ];

        const insecureSecret =
          insecureWords.some(
            (word) =>
              secret.includes(
                word
              )
          );

        if (
          insecureSecret
        ) {
          context.addIssue({
            code:
              "custom",

            path: [
              "JWT_SECRET",
            ],

            message:
              "JWT_SECRET ainda contém um valor de exemplo.",
          });
        }

        if (
          data.NODE_ENV ===
          "production"
        ) {
          const frontendUrl =
            new URL(
              data.FRONTEND_URL
            );

          if (
            frontendUrl.protocol !==
            "https:"
          ) {
            context.addIssue({
              code:
                "custom",

              path: [
                "FRONTEND_URL",
              ],

              message:
                "Em produção, FRONTEND_URL deve utilizar HTTPS.",
            });
          }

          if (
            [
              "localhost",
              "127.0.0.1",
              "::1",
            ].includes(
              frontendUrl.hostname
            )
          ) {
            context.addIssue({
              code:
                "custom",

              path: [
                "FRONTEND_URL",
              ],

              message:
                "FRONTEND_URL não pode apontar para localhost em produção.",
            });
          }
        }
      }
    );

const parsedEnv =
  envSchema.safeParse(
    process.env
  );

if (
  !parsedEnv.success
) {
  console.error(
    "Falha ao iniciar a aplicação."
  );

  console.error(
    "Variáveis de ambiente inválidas:"
  );

  console.error(
    parsedEnv.error
      .flatten()
      .fieldErrors
  );

  process.exit(1);
}

export const env =
  parsedEnv.data;

export const isProduction =
  env.NODE_ENV ===
  "production";