import React from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DonateFood from "./pages/DonateFood";
import AvailableFood from "./pages/AvailableFood";
import MyDonations from "./pages/MyDonations";
import ClaimedFood from "./pages/ClaimedFood";
import Deliveries from "./pages/Deliveries";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* DEFAULT ROUTE */}
      
      <Route
  path="/"
  element={<Home />}
/>

      <Route
        path="/register"
        element={<Register />}
       />

      {/* LOGIN */}
      
      <Route
        path="/login"
        element={<Login />}
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

      {/* DONATE FOOD */}
      
      <Route
        path="/donate-food"
        element={
          <ProtectedRoute>
            <DonateFood />
          </ProtectedRoute>
        }
      />

      {/* AVAILABLE FOOD */}

<Route
  path="/available-food"
  element={
    <ProtectedRoute>
      <AvailableFood />
    </ProtectedRoute>
  }
/>

{/* MY DONATIONS */}

<Route
  path="/my-donations"
  element={
    <ProtectedRoute>
      <MyDonations />
    </ProtectedRoute>
  }
/>

{/* CLAIMED FOOD */}

<Route
  path="/claimed-food"
  element={
    <ProtectedRoute>
      <ClaimedFood />
    </ProtectedRoute>
  }
/>

<Route
  path="/deliveries"
  element={
    <ProtectedRoute>
      <Deliveries />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default App;