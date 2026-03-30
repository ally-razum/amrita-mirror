import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css';
import Modal from 'react-modal';


const appRoot = document.getElementById('root');
if (appRoot) {
Modal.setAppElement(appRoot);

ReactDOM.createRoot(appRoot!).render(
    <App />
);
} else {
  console.error("App root element not found");
}