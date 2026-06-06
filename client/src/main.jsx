import React
from "react";

import ReactDOM
from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

import {
  Toaster,
} from "react-hot-toast";

import App
from "./App";

import {
  AuthProvider,
} from "./context/AuthContext";

/*
========================================
GLOBAL STYLES
========================================
*/

import "./styles/index.css";

import "leaflet/dist/leaflet.css";

/*
========================================
ROOT ELEMENT
========================================
*/

const root =
  ReactDOM.createRoot(

    document.getElementById(
      "root"
    )
  );

/*
========================================
RENDER APP
========================================
*/

root.render(

  <React.StrictMode>

    <BrowserRouter>

      <AuthProvider>

        {/* ========================================
            TOASTER
        ======================================== */}

        <Toaster

          position="top-right"

          reverseOrder={false}

          toastOptions={{

            duration: 3000,

            style: {

              borderRadius:
                "10px",

              background:
                "#333",

              color:
                "#fff",
            },
          }}
        />

        {/* ========================================
            APP
        ======================================== */}

        <App />

      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>
);