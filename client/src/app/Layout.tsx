import { Outlet } from "react-router-dom";

import Footer from "../widgets/footer/ui/Footer";
import Header from "../widgets/header/ui/Header";

function Layout() {
  return (
    <div className="layout">
      <Header/>
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
