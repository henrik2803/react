import {
  Outlet,
} from "react-router-dom";

import Header from "../Header/Header";

function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default PublicLayout;