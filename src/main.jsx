import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { BrowserRouter } from "react-router-dom";
import ToastProvider from "./assets/providers/ToastProvider.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {" "}
        <ToastProvider />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
