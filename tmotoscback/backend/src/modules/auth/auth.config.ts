import {
  env,
} from "../../config/env.js";

export const
  ADMIN_SESSION_COOKIE_NAME =
    env.NODE_ENV ===
    "production"
      ? "__Host-tmotos_admin_session"
      : "tmotos_admin_session";

export const
  ADMIN_SESSION_MAX_AGE =
    8 * 60 * 60;

export const
  ADMIN_SESSION_COOKIE_OPTIONS =
    {
      httpOnly: true,

      secure:
        env.NODE_ENV ===
        "production",

      sameSite:
        "strict" as const,

      path: "/",

      maxAge:
        ADMIN_SESSION_MAX_AGE,
    };

export const
  ADMIN_SESSION_CLEAR_COOKIE_OPTIONS =
    {
      secure:
        env.NODE_ENV ===
        "production",

      sameSite:
        "strict" as const,

      path: "/",
    };