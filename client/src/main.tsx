import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import combinedReducer from "../src/redux/reducerCombiner";
import { Toaster } from "./components/ui/toaster.tsx";
import { ClerkProvider } from '@clerk/clerk-react'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}



//configuring the redux store
const store = configureStore({
  reducer: combinedReducer,
});
// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <HelmetProvider>
      <Provider store={store}>
        <div onContextMenu={(e) => e.preventDefault()}>
        <App />
        </div>
        <Toaster/>
      </Provider>
    </HelmetProvider>
    </ClerkProvider>
  </BrowserRouter>
);
