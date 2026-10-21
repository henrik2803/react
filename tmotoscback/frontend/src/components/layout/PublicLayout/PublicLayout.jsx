import {
  Outlet,
} from "react-router-dom";

import Header from "../Header/Header";
import FloatingWhatsApp from "../FloatingWhatsApp/FloatingWhatsApp";

function PublicLayout() {
  return (
    <>
      <Header />

      <Outlet />

      <FloatingWhatsApp />
    </>
  );
}

export default PublicLayout;