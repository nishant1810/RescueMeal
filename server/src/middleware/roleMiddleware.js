import { ROLES }
from "../constants/roles.js";

/*
========================================
ROLE MIDDLEWARE
========================================
*/

const roleMiddleware =
  (...allowedRoles) => {

    return (
      req,
      res,
      next
    ) => {

      /*
      ========================================
      USER CHECK
      ========================================
      */

      if (!req.user) {

        return res
          .status(401)
          .json({

            success: false,

            message:
              "Unauthorized access",
          });
      }

      /*
      ========================================
      ROLE CHECK
      ========================================
      */

      if (

        !allowedRoles.includes(
          req.user.role
        )

      ) {

        return res
          .status(403)
          .json({

            success: false,

            message:
              "Access denied",
          });
      }

      /*
      ========================================
      NEXT
      ========================================
      */

      next();
    };
  };

export default
roleMiddleware;