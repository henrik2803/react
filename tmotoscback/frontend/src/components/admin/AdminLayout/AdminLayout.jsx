import {
  Bike,
  FileText,
  LayoutDashboard,
  LogOut,
  Package,
} from "lucide-react";

import {
  NavLink,
  Outlet,
} from "react-router-dom";

import useAdminAuth from "../../../hooks/useAdminAuth";

import styles from "./AdminLayout.module.css";

function AdminLayout() {
  const {
    logout,
  } = useAdminAuth();

  function getLinkClass({
    isActive,
  }) {
    return isActive
      ? `${styles.link} ${styles.active}`
      : styles.link;
  }

  return (
    <div
      className={
        styles.layout
      }
    >
      <aside
        className={
          styles.sidebar
        }
      >
        <div
          className={
            styles.brand
          }
        >
          T<span>MOTOS</span>

          <small>
            Administração
          </small>
        </div>

        <nav
          className={
            styles.navigation
          }
        >
          <NavLink
            to="/admin"
            end
            className={
              getLinkClass
            }
          >
            <LayoutDashboard
              size={20}
            />

            Dashboard
          </NavLink>

          <NavLink
            to="/admin/propostas"
            className={
              getLinkClass
            }
          >
            <FileText
              size={20}
            />

            Propostas
          </NavLink>

          <NavLink
            to="/admin/test-rides"
            className={
              getLinkClass
            }
          >
            <Bike size={20} />

            Test Rides
          </NavLink>

          <NavLink
            to="/admin/produtos"
            className={
              getLinkClass
            }
          >
            <Package
              size={20}
            />

            Produtos
          </NavLink>
        </nav>

        <button
          type="button"
          className={
            styles.logout
          }
          onClick={logout}
        >
          <LogOut size={20} />

          Sair
        </button>
      </aside>

      <div
        className={
          styles.content
        }
      >
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;