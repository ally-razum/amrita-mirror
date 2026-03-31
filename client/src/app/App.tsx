import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import ClientCard from "../page/clientCard/clientCard";
import MainPageAroma from "../page/mainPageAroma/mainPageAroma";
import Header from "../page/header/Header";
import ClientCardView from "../page/clientCard/clientCardView";
import ClientListViewRules from "../page/clientList/clientListViewRules";
import Footer from "../page/Footer/Footer";
import ErrorPage404 from "../page/errorPage/errorPage404";
import SigninBox from "../page/auth/LoginPage";
import UserList from "../page/users/usersList";
import ErrorPage403 from "../page/errorPage/errorPage403";

const AppContent = () => {
  const location = useLocation(); // Получаем текущий маршрут

  return (
    <>
      {location.pathname !== "/" && <Header />}

      <Routes>
        <Route path="/" element={<SigninBox />} />
        <Route path="/dashboard" element={<MainPageAroma />} />
        <Route path="/dashboard/cards" element={<ClientListViewRules />} />
        <Route path="/dashboard/cards/new" element={<ClientCard />} />
        <Route path="/dashboard/cards/:cardId" element={<ClientCardView />} />
        <Route path="/dashboard/users" element={<UserList />} />
        <Route path="/dashboard/users/new" element={<ErrorPage403 />} />
        <Route path="/dashboard/users/:userId" element={<ClientCardView />} />

        <Route path="*" element={<ErrorPage404 />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <>
      <Router>
        <AppContent />
        <Footer />
      </Router>
    </>
  );
}

export default App;
