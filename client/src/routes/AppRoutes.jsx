import React
from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/*
========================================
ROUTE PROTECTION
========================================
*/

import ProtectedRoute
from "./ProtectedRoute";

/*
========================================
PAGES
========================================
*/

import Login
from "../pages/auth/Login";

import Register
from "../pages/auth/Register";

import Dashboard
from "../pages/common/Dashboard";

import DonateFood
from "../pages/donor/DonateFood";

import MyDonations
from "../pages/donor/MyDonations";

import AvailableFood
from "../pages/ngo/AvailableFood";

import ClaimedFood
from "../pages/ngo/ClaimedFood";

import VolunteerDeliveries
from "../pages/volunteer/VolunteerDeliveries";

import Unauthorized
from "../pages/common/Unauthorized";

import NotFound
from "../pages/common/NotFound";

/*
========================================
CONSTANTS
========================================
*/

import { ROLES }
from "../constants/roles";

/*
========================================
APP ROUTES
========================================
*/

const AppRoutes =
  () => {

    return (

      <Routes>

        {/* ========================================
            PUBLIC ROUTES
        ======================================== */}

        <Route

          path="/login"

          element={<Login />}
        />

        <Route

          path="/register"

          element={<Register />}
        />

        {/* ========================================
            DASHBOARD
        ======================================== */}

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

        <Route

          path="/donate-food"

          element={

            <ProtectedRoute

              allowedRoles={[
                ROLES.DONOR,
              ]}
            >

              <DonateFood />

            </ProtectedRoute>
          }
        />

        <Route

          path="/my-donations"

          element={

            <ProtectedRoute

              allowedRoles={[
                ROLES.DONOR,
              ]}
            >

              <MyDonations />

            </ProtectedRoute>
          }
        />

        {/* ========================================
            NGO ROUTES
        ======================================== */}

        <Route

          path="/available-food"

          element={

            <ProtectedRoute

              allowedRoles={[
                ROLES.NGO,
              ]}
            >

              <AvailableFood />

            </ProtectedRoute>
          }
        />

        <Route

          path="/claimed-food"

          element={

            <ProtectedRoute

              allowedRoles={[
                ROLES.NGO,
              ]}
            >

              <ClaimedFood />

            </ProtectedRoute>
          }
        />

        {/* ========================================
            VOLUNTEER ROUTES
        ======================================== */}

        <Route

          path="/volunteer-deliveries"

          element={

            <ProtectedRoute

              allowedRoles={[
                ROLES.VOLUNTEER,
              ]}
            >

              <VolunteerDeliveries />

            </ProtectedRoute>
          }
        />

        {/* ========================================
            UNAUTHORIZED
        ======================================== */}

        <Route

          path="/unauthorized"

          element={<Unauthorized />}
        />

        {/* ========================================
            HOME REDIRECT
        ======================================== */}

        <Route

          path="/"

          element={

            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        {/* ========================================
            404 PAGE
        ======================================== */}

        <Route

          path="*"

          element={<NotFound />}
        />

      </Routes>
    );
  };

export default
AppRoutes;