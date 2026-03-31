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

const AppContent = () => {
  const location = useLocation(); // Получаем текущий маршрут

  return (
    <>
      {location.pathname !== "/" && <Header />}

      <Routes>
        <Route path="/" element={<SigninBox/>} />
        <Route path="/cabinet" element={<MainPageAroma />} />
        <Route path="/clientlist" element={<ClientListViewRules />} />
        <Route path="/newcard" element={<ClientCard />} />
        <Route path="/viewcard/:clientId" element={<ClientCardView />} />
        <Route path="*" element={<ErrorPage404 />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <>
      <Router>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <AppContent />
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
