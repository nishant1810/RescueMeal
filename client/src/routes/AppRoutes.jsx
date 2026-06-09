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

import Home from "../pages/common/Home.jsx";

import NotFound from "../pages/common/NotFound.jsx";

import Unauthorized from "../pages/common/Unauthorized.jsx";

/*
========================================
AUTH PAGES
========================================
*/

import Login from "../pages/auth/Login.jsx";

import Register from "../pages/auth/Register.jsx";

/*
========================================
DONOR PAGES
========================================
*/

import DonorDashboard from "../pages/donor/Dashboard.jsx";

import DonateFood from "../pages/donor/DonateFood.jsx";

import MyDonations from "../pages/donor/MyDonations.jsx";

/*
========================================
NGO PAGES
========================================
*/

import NGODashboard from "../pages/ngo/Dashboard.jsx";

import AvailableFood from "../pages/ngo/AvailableFood.jsx";

import ClaimedFood from "../pages/ngo/ClaimedFood.jsx";

/*
========================================
VOLUNTEER PAGES
========================================
*/

import VolunteerDashboard from "../pages/volunteer/Dashboard.jsx";

import Deliveries from "../pages/volunteer/Deliveries.jsx";

/*
========================================
ADMIN PAGES
========================================
*/

import AdminDashboard from "../pages/admin/Dashboard.jsx";

/*
========================================
PROTECTED ROUTE
========================================
*/

import ProtectedRoute from "./ProtectedRoute.jsx";

/*
========================================
ROLES
========================================
*/

import {
  ROLES,
} from "../constants/roles.js";

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