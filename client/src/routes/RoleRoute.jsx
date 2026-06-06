import React
from "react";

import {
  Navigate,
} from "react-router-dom";

/*
========================================
ROLE ROUTE
========================================
*/

const RoleRoute =
  ({
    children,
    allowedRoles,
  }) => {

    /*
    ========================================
    GET USER
    ========================================
    */

    const user =
      JSON.parse(

        localStorage.getItem(
          "user"
        )
      );

    /*
    ========================================
    INVALID ROLE
    ========================================
    */

    if (

      !user ||

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
    AUTHORIZED
    ========================================
    */

    return children;
  };

export default
RoleRoute;