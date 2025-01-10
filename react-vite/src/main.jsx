import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import { ModalProvider, Modal } from "./context/Modal";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import * as sessionActions from "./redux/session";
import "./index.css";

if (import.meta.env.MODE !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ModalProvider>
        <RouterProvider router={router}>
          <Modal />
        </RouterProvider>
      </ModalProvider>
    </ReduxProvider>
  </React.StrictMode>
);