import React from "react";

import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

import {
  Toaster,
} from "react-hot-toast";

/*
========================================
GLOBAL STYLES
========================================
*/

import "./styles/index.css";

import "leaflet/dist/leaflet.css";

/*
========================================
APP
========================================
*/

import App from "./App";

/*
========================================
GLOBAL PROVIDERS
========================================
*/

import Providers from "./app/providers.jsx";

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
RENDER APPLICATION
========================================
*/

root.render(

  <React.StrictMode>

    <BrowserRouter>

      <Providers>

        {/* ========================================
            TOAST NOTIFICATIONS
        ======================================== */}

        <Toaster

          position="top-right"

          reverseOrder={false}

          toastOptions={{

            duration: 3000,

            style: {

              borderRadius:
                "12px",

              background:
                "#1f2937",

              color:
                "#ffffff",
            },
          }}
        />

        {/* ========================================
            APPLICATION
        ======================================== */}

        <App />

      </Providers>

    </BrowserRouter>

  </React.StrictMode>
);