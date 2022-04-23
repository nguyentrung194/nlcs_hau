import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
// import UserContextProvider from "./contexts/reducer";

ReactDOM.render(
  <ToastProvider autoDismissTimeout={3000} placement="top-right">
    {/* <UserContextProvider> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </UserContextProvider> */}
  </ToastProvider>,
  document.getElementById("root")
);

reportWebVitals();
