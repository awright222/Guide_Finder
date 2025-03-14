import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./redux/store";
import { router } from "./router";
import { ModalProvider, Modal } from "./context/Modal";
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
      <RouterProvider router={router} />
      <Modal />
    </ModalProvider>
  </ReduxProvider>
</React.StrictMode>
);

