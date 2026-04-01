import { BrowserRouter as Router } from "react-router-dom";
import AppContent from "./AppContent";
import Footer from "../page/Footer/Footer";

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
