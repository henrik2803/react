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

const OLD_STORAGE_KEY =
  "tmotos_admin_token";

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
          /*
           * Remove eventual token
           * deixado pela implementação
           * antiga.
           */
          sessionStorage.removeItem(
            OLD_STORAGE_KEY
          );

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
   * CARREGAMENTO INICIAL
   * =====================================================
   */

  useEffect(() => {
    let active =
      true;

    async function restoreSession() {
      try {
        sessionStorage.removeItem(
          OLD_STORAGE_KEY
        );

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
           * Mesmo que o backend não
           * responda, removemos a
           * autenticação do frontend.
           */
        } finally {
          sessionStorage.removeItem(
            OLD_STORAGE_KEY
          );

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
        /*
         * Compatibilidade temporária
         * com as páginas atuais.
         *
         * Nenhum JWT real fica
         * disponível no JavaScript.
         */
        token: null,

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