import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { ShopProvider } from "./store/ShopContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ShopProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </ShopProvider>
  </React.StrictMode>
);
