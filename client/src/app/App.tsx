import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import ClientCard from "../page/clientCard/clientCard";
import MainPageAroma from "../page/mainPageAroma/mainPageAroma";

import Header from "../page/header/Header";
import StartPage from "../page/startPage/StartPage";
import ClientCardView from "../page/clientCard/clientCardView";
import ErrorPage401 from "../page/errorPage/errorPage401";

import ClientListViewRules from "../page/clientList/clientListViewRules";



import Footer from "../page/Footer/Footer";

const AppContent = () => {
  const location = useLocation(); // Получаем текущий маршрут

  return (
    <>
      {location.pathname !== "/" && <Header />}

      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/cabinet" element={<MainPageAroma />} /> 
        <Route path="/clientlist" element={<ClientListViewRules />} />
        <Route path="/newcard" element={<ClientCard />} />
        <Route path="/viewcard/:clientId" element={<ClientCardView />} />
        <Route path="/error" element={<ErrorPage401 />} />
       
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
