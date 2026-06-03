import React from "react";

import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

import { Toaster }
from "react-hot-toast";

import "react-loading-skeleton/dist/skeleton.css";

import "./index.css";

import App from "./App";

import {
  AuthProvider,
} from "./context/AuthContext";

import {
  NotificationProvider,
} from "./context/NotificationContext";

/*
========================================
ROOT RENDER
========================================
*/

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          {/* TOAST */}

          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 3000,
            }}
          />

          {/* APP */}

          <App />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);