import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import combinedReducer from "../src/redux/reducerCombiner";
import { Toaster } from "./components/ui/toaster.tsx";
import { ThemeProvider } from "@/components/ui/theme-provider.tsx";
import { api } from "./redux/rtkQueryAPIs.ts";


//configuring the redux store
const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware)
  }
});
// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
  <BrowserRouter>
    <HelmetProvider>
      <Provider store={store}>
        
        <App />
        
        <Toaster/>
      </Provider>
    </HelmetProvider>
  </BrowserRouter>
  </ThemeProvider>
);
