import { configureStore } from "@reduxjs/toolkit";
import { default as logger } from "redux-logger";
import sessionReducer from "./session";
import favoritesReducer from "./favorites";
import bookingsReducer from "./bookings";

const store = configureStore({
  reducer: {
    session: sessionReducer,
    favorites: favoritesReducer,
    bookings: bookingsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();
    if (import.meta.env.MODE === "development") {
      middlewares.push(logger);
    }
    return middlewares;
  },
  devTools: import.meta.env.MODE !== "production",
});

export default store;