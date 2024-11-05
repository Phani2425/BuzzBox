import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import combinedReducer from "../src/redux/reducerCombiner";

//configuring the redux store
const store = configureStore({
  reducer: combinedReducer,
});
// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <HelmetProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </HelmetProvider>
  </BrowserRouter>
);
