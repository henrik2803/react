import bcrypt from "bcryptjs";

import {
  env,
} from "../../config/env.js";

export async function validateAdminCredentials(
  email: string,
  password: string
) {
  const normalizedEmail =
    email
      .trim()
      .toLowerCase();

  const adminEmail =
    env.ADMIN_EMAIL
      .trim()
      .toLowerCase();

  if (
    normalizedEmail !==
    adminEmail
  ) {
    return false;
  }

  return bcrypt.compare(
    password,
    env.ADMIN_PASSWORD_HASH
  );
}