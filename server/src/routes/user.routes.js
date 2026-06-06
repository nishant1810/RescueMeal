import express
from "express";

import {
  getProfile,
} from "../controllers/user.controller.js";

import protect
from "../middleware/authMiddleware.js";

import roleMiddleware
from "../middleware/roleMiddleware.js";

import { ROLES }
from "../constants/roles.js";

/*
========================================
ROUTER
========================================
*/

const router =
  express.Router();

/*
========================================
USER ROUTES
========================================
*/

/*
========================================
GET CURRENT USER PROFILE
========================================
*/

router.get(

  "/profile",

  protect,

  getProfile
);

/*
========================================
ADMIN TEST ROUTE
(PRODUCTION RBAC EXAMPLE)
========================================
*/

router.get(

  "/admin-test",

  protect,

  roleMiddleware(
    ROLES.ADMIN
  ),

  (
    req,
    res
  ) => {

    return res
      .status(200)
      .json({

        success: true,

        message:
          "Admin route accessed successfully",
      });
  }
);

/*
========================================
NGO TEST ROUTE
========================================
*/

router.get(

  "/ngo-test",

  protect,

  roleMiddleware(
    ROLES.NGO
  ),

  (
    req,
    res
  ) => {

    return res
      .status(200)
      .json({

        success: true,

        message:
          "NGO route accessed successfully",
      });
  }
);

/*
========================================
VOLUNTEER TEST ROUTE
========================================
*/

router.get(

  "/volunteer-test",

  protect,

  roleMiddleware(
    ROLES.VOLUNTEER
  ),

  (
    req,
    res
  ) => {

    return res
      .status(200)
      .json({

        success: true,

        message:
          "Volunteer route accessed successfully",
      });
  }
);

/*
========================================
DONOR TEST ROUTE
========================================
*/

router.get(

  "/donor-test",

  protect,

  roleMiddleware(
    ROLES.DONOR
  ),

  (
    req,
    res
  ) => {

    return res
      .status(200)
      .json({

        success: true,

        message:
          "Donor route accessed successfully",
      });
  }
);

/*
========================================
EXPORT ROUTER
========================================
*/

export default
router;