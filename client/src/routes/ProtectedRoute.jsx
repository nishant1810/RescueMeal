import React
from "react";

import {
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

/*
========================================
PROTECTED ROUTE
========================================
*/

const ProtectedRoute =
  ({
    children,
    allowedRoles = [],
  }) => {

    /*
    ========================================
    AUTH CONTEXT
    ========================================
    */

    const {

      user,

      loading,

    } = useAuth();

    /*
    ========================================
    CURRENT LOCATION
    ========================================
    */

    const location =
      useLocation();

    /*
    ========================================
    LOADING SCREEN
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

            bg-gray-50
          "
        >

          <div
            className="text-center"
          >

            <h1

              className="

                text-2xl

                font-bold

                text-green-600
              "
            >

              Loading...

            </h1>

          </div>

        </div>
      );
    }

    /*
    ========================================
    NOT AUTHENTICATED
    ========================================
    */

    if (!user) {

      return (

        <Navigate

          to="/login"

          state={{
            from: location,
          }}

          replace
        />
      );
    }

    /*
    ========================================
    ROLE AUTHORIZATION
    ========================================
    */

    if (

      allowedRoles.length > 0 &&

      !allowedRoles.includes(
        user.role
      )

    ) {

      return (

        <Navigate

          to="/unauthorized"

          replace
        />
      );
    }

    /*
    ========================================
    ACCESS GRANTED
    ========================================
    */

    return children;
  };

export default
ProtectedRoute;