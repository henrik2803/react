import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  adminLogin,
} from "../services/adminService";

export const AdminAuthContext =
  createContext(null);

const STORAGE_KEY =
  "tmotos_admin_token";

export function AdminAuthProvider({
  children,
}) {
  const [token, setToken] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const savedToken =
      sessionStorage.getItem(
        STORAGE_KEY
      );

    if (savedToken) {
      setToken(savedToken);
    }

    setLoading(false);
  }, []);

  async function login(
    email,
    password
  ) {
    const data =
      await adminLogin(
        email,
        password
      );

    sessionStorage.setItem(
      STORAGE_KEY,
      data.token
    );

    setToken(data.token);

    return data;
  }

  function logout() {
    sessionStorage.removeItem(
      STORAGE_KEY
    );

    setToken(null);
  }

  return (
    <AdminAuthContext.Provider
      value={{
        token,
        loading,
        isAuthenticated:
          Boolean(token),
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}