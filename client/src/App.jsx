import React from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/*
========================================
PAGES
========================================
*/

import Home
from "./pages/Home";

import Login
from "./pages/Login";

import Register
from "./pages/Register";

import Dashboard
from "./pages/Dashboard";

import DonateFood
from "./pages/DonateFood";

import AvailableFood
from "./pages/AvailableFood";

import MyDonations
from "./pages/MyDonations";

import ClaimedFood
from "./pages/ClaimedFood";

import Deliveries
from "./pages/Deliveries";

/*
========================================
PROTECTED ROUTE
========================================
*/

import ProtectedRoute
from "./routes/ProtectedRoute";

function App() {

  return (
    <Routes>

      {/* ========================================
          PUBLIC ROUTES
      ======================================== */}

      {/* HOME */}

      <Route
        path="/"
        element={<Home />}
      />

      {/* REGISTER */}

      <Route
        path="/register"
        element={<Register />}
      />

      {/* LOGIN */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* ========================================
          PROTECTED ROUTES
      ======================================== */}

      {/* DASHBOARD */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ========================================
          DONOR ROUTES
      ======================================== */}

      {/* DONATE FOOD */}

      <Route
        path="/donate-food"
        element={
          <ProtectedRoute
            allowedRoles={[
              "donor",
            ]}
          >
            <DonateFood />
          </ProtectedRoute>
        }
      />

      {/* MY DONATIONS */}

      <Route
        path="/my-donations"
        element={
          <ProtectedRoute
            allowedRoles={[
              "donor",
            ]}
          >
            <MyDonations />
          </ProtectedRoute>
        }
      />

      {/* ========================================
          NGO ROUTES
      ======================================== */}

      {/* AVAILABLE FOOD */}

      <Route
        path="/available-food"
        element={
          <ProtectedRoute
            allowedRoles={[
              "ngo",
            ]}
          >
            <AvailableFood />
          </ProtectedRoute>
        }
      />

      {/* CLAIMED FOOD */}

      <Route
        path="/claimed-food"
        element={
          <ProtectedRoute
            allowedRoles={[
              "ngo",
            ]}
          >
            <ClaimedFood />
          </ProtectedRoute>
        }
      />

      {/* ========================================
          VOLUNTEER ROUTES
      ======================================== */}

      {/* DELIVERIES */}

      <Route
        path="/deliveries"
        element={
          <ProtectedRoute
            allowedRoles={[
              "volunteer",
            ]}
          >
            <Deliveries />
          </ProtectedRoute>
        }
      />

      {/* ========================================
          INVALID ROUTES
      ======================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;