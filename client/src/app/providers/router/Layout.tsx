// src/app/providers/router/Layout.tsx
import { Outlet } from "react-router-dom";
import Header from "../../../page/header/Header";
import Footer from "../../../page/Footer/Footer";

function Layout() {
  return (
    <div className="layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
