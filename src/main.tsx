import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.tsx";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/features/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className=" fixed top-0 left-0 w-full min-h-screen -z-10"></div>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      <Toaster />
    </Provider>
  </StrictMode>
);
