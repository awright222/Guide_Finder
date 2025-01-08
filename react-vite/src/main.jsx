import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./redux/store";
import { router } from "./router";
import * as sessionActions from "./redux/session";
import { ModalProvider, Modal } from "./context/Modal"; 
import "./index.css";

if (import.meta.env.MODE !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ModalProvider>
        <Modal /> 
        <RouterProvider router={router} />
      </ModalProvider>
    </ReduxProvider>
  </React.StrictMode>
);