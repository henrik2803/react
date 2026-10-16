import {
  Navigate,
  Outlet,
} from "react-router-dom";

import useAdminAuth from "../hooks/useAdminAuth";

function AdminProtectedRoute() {
  const {
    isAuthenticated,
    loading,
  } = useAdminAuth();

  if (loading) {
    return (
      <p>
        Carregando...
      </p>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return <Outlet />;
}

export default AdminProtectedRoute;