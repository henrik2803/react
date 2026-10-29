import {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  adminLogin,
  adminLogout,
  getAdminSession,
} from "../services/adminService";

export const AdminAuthContext =
  createContext(null);

export function AdminAuthProvider({
  children,
}) {
  const [
    isAuthenticated,
    setIsAuthenticated,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(true);

  /*
   * =====================================================
   * VERIFICAR SESSÃO
   * =====================================================
   */

  const checkSession =
    useCallback(
      async () => {
        try {
          await getAdminSession();

          setIsAuthenticated(
            true
          );

          return true;
        } catch {
          setIsAuthenticated(
            false
          );

          return false;
        }
      },
      []
    );

  /*
   * =====================================================
   * RESTAURAR SESSÃO
   * =====================================================
   */

  useEffect(() => {
    let active =
      true;

    async function restoreSession() {
      try {
        await getAdminSession();

        if (active) {
          setIsAuthenticated(
            true
          );
        }
      } catch {
        if (active) {
          setIsAuthenticated(
            false
          );
        }
      } finally {
        if (active) {
          setLoading(
            false
          );
        }
      }
    }

    restoreSession();

    return () => {
      active =
        false;
    };
  }, []);

  /*
   * =====================================================
   * LOGIN
   * =====================================================
   */

  const login =
    useCallback(
      async (
        email,
        password
      ) => {
        const data =
          await adminLogin(
            email,
            password
          );

        setIsAuthenticated(
          true
        );

        return data;
      },
      []
    );

  /*
   * =====================================================
   * LOGOUT
   * =====================================================
   */

  const logout =
    useCallback(
      async () => {
        try {
          await adminLogout();
        } catch {
          /*
           * Mesmo que o backend esteja
           * indisponível, o frontend
           * deixa de considerar a
           * sessão autenticada.
           */
        } finally {
          setIsAuthenticated(
            false
          );
        }
      },
      []
    );

  return (
    <AdminAuthContext.Provider
      value={{
        loading,
        isAuthenticated,
        login,
        logout,
        checkSession,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}