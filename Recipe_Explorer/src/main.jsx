import { StrictMode } from 'react'
import { BrowserRouter as Router} from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DisplayProvider } from "./context/DisplayContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <DisplayProvider>
        <App />
      </DisplayProvider>
    </Router>
  </StrictMode>,
)
