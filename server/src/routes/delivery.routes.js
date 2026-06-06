import express from "express";
import { ROLES } from "../constants/roles.js";
/*
========================================
CONTROLLERS
========================================
*/

import {

  getAvailableDeliveries,

  acceptDelivery,

  markPicked,

  markDelivered,

  getVolunteerHistory,

} from "../controllers/delivery.controller.js";

/*
========================================
MIDDLEWARE
========================================
*/

import authMiddleware
from "../middleware/authMiddleware.js";

import roleMiddleware
from "../middleware/roleMiddleware.js";

/*
========================================
ROUTER
========================================
*/

const router =
  express.Router();

/*
========================================
GET AVAILABLE DELIVERIES
========================================
*/

router.get(

  "/",

  authMiddleware,

  roleMiddleware(
    "volunteer"
  ),

  getAvailableDeliveries
);

/*
========================================
ACCEPT DELIVERY
========================================
*/

router.patch(

  "/accept/:id",

  authMiddleware,

  roleMiddleware(
    "volunteer"
  ),

  acceptDelivery
);

/*
========================================
MARK PICKED
========================================
*/

router.patch(

  "/pick/:id",

  authMiddleware,

  roleMiddleware(
    "volunteer"
  ),

  markPicked
);

/*
========================================
MARK DELIVERED
========================================
*/

router.patch(

  "/deliver/:id",

  authMiddleware,

  roleMiddleware(
    "volunteer"
  ),

  markDelivered
);

/*
========================================
VOLUNTEER HISTORY
========================================
*/

router.get(

  "/history",

  authMiddleware,

  roleMiddleware(
    ROLES.VOLUNTEER
  ),

  getVolunteerHistory
);

/*
========================================
EXPORT
========================================
*/

export default router;