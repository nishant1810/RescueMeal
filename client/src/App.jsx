import React
from "react";

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

import MyDonations
from "./pages/MyDonations";

import AvailableFood
from "./pages/AvailableFood";

import ClaimedFood
from "./pages/ClaimedFood";

import VolunteerDashboard
from "./pages/VolunteerDashboard";

import Unauthorized
from "./pages/Unauthorized";

import NotFound
from "./pages/NotFound";

/*
========================================
ROUTES
========================================
*/

import ProtectedRoute
from "./routes/ProtectedRoute";

/*
========================================
CONSTANTS
========================================
*/

import {
  ROLES,
} from "./constants/roles";

/*
========================================
APP
========================================
*/

function App() {

  return (

    <Routes>

      {/* PUBLIC */}

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

      {/* DASHBOARD */}

      <Route

        path="/dashboard"

        element={

          <ProtectedRoute>

            <Dashboard />

          </ProtectedRoute>
        }
      />

      {/* DONOR */}

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

      {/* NGO */}

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

      {/* VOLUNTEER */}

      <Route

        path="/deliveries"

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

      {/* UNAUTHORIZED */}

      <Route

        path="/unauthorized"

        element={<Unauthorized />}
      />

      {/* 404 */}

      <Route

        path="/404"

        element={<NotFound />}
      />

      {/* INVALID */}

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
}

export default App;