import React from "react";

import {
  Navigate,
} from "react-router-dom";

import { useAuth }
from "../context/AuthContext";

const ProtectedRoute = ({
  children,
  allowedRoles = [],
}) => {
  /*
  ========================================
  AUTH
  ========================================
  */

  const {
    user,
    loading,
  } = useAuth();

  /*
  ========================================
  LOADING
  ========================================
  */

  if (loading) {
    return (
      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
      "
      >
        <h1
          className="
          text-2xl
          font-bold
        "
        >
          Loading...
        </h1>
      </div>
    );
  }

  /*
  ========================================
  NOT LOGGED IN
  ========================================
  */

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  /*
  ========================================
  ROLE CHECK
  ========================================
  */

  if (
    allowedRoles.length >
      0 &&
    !allowedRoles.includes(
      user.role
    )
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  /*
  ========================================
  ALLOWED
  ========================================
  */

  return children;
};

export default ProtectedRoute;