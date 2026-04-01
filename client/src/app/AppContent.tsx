import { Routes, Route, useLocation } from "react-router-dom";

import MainPageAroma from "../page/mainPageAroma/mainPageAroma";
import Header from "../page/header/Header";

import ClientListViewRules from "../page/clientList/clientListViewRules";

import ErrorPage404 from "../page/errorPage/errorPage404";
import SigninBox from "../page/auth/LoginPage";
import UserList from "../page/users/usersList";
import ErrorPage403 from "../page/errorPage/errorPage403";
import ClientCardAdminView from "../page/clientCard/clientCardAdmit/clientCardAdminView";
import ClientCardAdmin from "../page/clientCard/clientCardAdmit/clientCardAdmin";

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Header />}

      <Routes>
        <Route path="/" element={<SigninBox />} />
        <Route path="/dashboard" element={<MainPageAroma />} />
        <Route path="/dashboard/cards" element={<ClientListViewRules />} />
        <Route path="/dashboard/cards/new" element={<ClientCardAdmin />} />
        <Route
          path="/dashboard/cards/:cardId"
          element={<ClientCardAdminView />}
        />
        <Route path="/dashboard/users" element={<UserList />} />
        <Route path="/dashboard/users/new" element={<ErrorPage403 />} />
        <Route path="/dashboard/users/:userId" element={<ClientCardAdmin />} />

        <Route path="*" element={<ErrorPage404 />} />
      </Routes>
    </>
  );
}

export default AppContent;
