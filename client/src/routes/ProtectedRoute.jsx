import React from "react";

import {
  Navigate,
  useLocation,
} from "react-router-dom";

/*
========================================
AUTH CONTEXT
========================================
*/

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
    LOADING STATE
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

            <div

              className="
                w-14
                h-14
                border-4
                border-orange-500
                border-t-transparent
                rounded-full
                animate-spin
                mx-auto
                mb-4
              "
            />

            <h2

              className="
                text-2xl
                font-bold
                text-gray-700
              "
            >

              Loading...

            </h2>

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

export default ProtectedRoute;