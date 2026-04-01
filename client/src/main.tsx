import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.css";
import Modal from "react-modal";

const root = document.getElementById("root");

if (!root) throw new Error("Root not found");

Modal.setAppElement(root);

ReactDOM.createRoot(root).render(<App />);