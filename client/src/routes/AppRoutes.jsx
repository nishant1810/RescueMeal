import React from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/*
========================================
COMMON PAGES
========================================
*/

import Home
from "../pages/common/Home";

import NotFound
from "../pages/common/NotFound";

import Unauthorized
from "../pages/common/Unauthorized";

/*
========================================
AUTH PAGES
========================================
*/

import Login
from "../pages/auth/Login";

import Register
from "../pages/auth/Register";

/*
========================================
DONOR PAGES
========================================
*/

import DonorDashboard
from "../pages/donor/Dashboard";

import DonateFood
from "../pages/donor/DonateFood";

import MyDonations
from "../pages/donor/MyDonations";

/*
========================================
NGO PAGES
========================================
*/

import NGODashboard
from "../pages/ngo/Dashboard";

import AvailableFood
from "../pages/ngo/AvailableFood";

import ClaimedFood
from "../pages/ngo/ClaimedFood";

/*
========================================
VOLUNTEER PAGES
========================================
*/

import VolunteerDashboard
from "../pages/volunteer/Dashboard";

import Deliveries
from "../pages/volunteer/Deliveries";

/*
========================================
ADMIN PAGES
========================================
*/

import AdminDashboard
from "../pages/admin/Dashboard";

/*
========================================
PROTECTED ROUTE
========================================
*/

import ProtectedRoute
from "./ProtectedRoute";

/*
========================================
ROLES
========================================
*/

import {
  ROLES,
} from "../constants/roles";

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
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />

        {/* ========================================
            DONOR ROUTES
        ======================================== */}

        <Route
          path="/donor/dashboard"
          element={

            <ProtectedRoute
              allowedRoles={[
                ROLES.DONOR,
              ]}
            >

              <DonorDashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/donor/donate-food"
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
          path="/donor/my-donations"
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
          path="/ngo/dashboard"
          element={

            <ProtectedRoute
              allowedRoles={[
                ROLES.NGO,
              ]}
            >

              <NGODashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/ngo/available-food"
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
          path="/ngo/claimed-food"
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
          path="/volunteer/dashboard"
          element={

            <ProtectedRoute
              allowedRoles={[
                ROLES.VOLUNTEER,
              ]}
            >

              <VolunteerDashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/volunteer/deliveries"
          element={

            <ProtectedRoute
              allowedRoles={[
                ROLES.VOLUNTEER,
              ]}
            >

              <Deliveries />

            </ProtectedRoute>
          }
        />

        {/* ========================================
            ADMIN ROUTES
        ======================================== */}

        <Route
          path="/admin/dashboard"
          element={

            <ProtectedRoute
              allowedRoles={[
                ROLES.ADMIN,
              ]}
            >

              <AdminDashboard />

            </ProtectedRoute>
          }
        />

        {/* ========================================
            FALLBACK ROUTES
        ======================================== */}

        <Route
          path="/404"
          element={<NotFound />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/404"
              replace
            />
          }
        />

      </Routes>
    );
  };

export default AppRoutes;