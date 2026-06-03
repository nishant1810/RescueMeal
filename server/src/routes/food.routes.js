import express from "express";

/*
========================================
MIDDLEWARE
========================================
*/

import upload
from "../middleware/uploadMiddleware.js";

import authMiddleware
from "../middleware/authMiddleware.js";

import roleMiddleware
from "../middleware/roleMiddleware.js";

/*
========================================
CONTROLLERS
========================================
*/

import {
  donateFood,

  getAllFood,

  getMyDonations,

  claimFood,

  getDashboardStats,

  getClaimedFood,

  assignDelivery,

  markDelivered,

  getVolunteerDeliveries,
} from "../controllers/food.js";

/*
========================================
ROUTER
========================================
*/

const router =
  express.Router();

/*
========================================
DONATE FOOD
========================================
*/

router.post(
  "/donate",

  authMiddleware,

  /*
  ========================================
  TEMPORARILY REMOVE ROLE MIDDLEWARE
  FOR TESTING IMAGE UPLOAD
  ========================================
  */

  // roleMiddleware(
  //   "donor"
  // ),

  upload.single(
    "foodImage"
  ),

  donateFood
);

/*
========================================
GET ALL FOOD
========================================
*/

router.get(
  "/all",

  authMiddleware,

  roleMiddleware(
    "ngo"
  ),

  getAllFood
);

/*
========================================
GET MY DONATIONS
========================================
*/

router.get(
  "/my-donations",

  authMiddleware,

  roleMiddleware(
    "donor"
  ),

  getMyDonations
);

/*
========================================
CLAIM FOOD
========================================
*/

router.put(
  "/claim/:id",

  authMiddleware,

  roleMiddleware(
    "ngo"
  ),

  claimFood
);

/*
========================================
GET CLAIMED FOOD
========================================
*/

router.get(
  "/claimed-food",

  authMiddleware,

  roleMiddleware(
    "ngo"
  ),

  getClaimedFood
);

/*
========================================
ASSIGN DELIVERY
========================================
*/

router.put(
  "/assign/:id",

  authMiddleware,

  roleMiddleware(
    "ngo"
  ),

  assignDelivery
);

/*
========================================
MARK DELIVERED
========================================
*/

router.put(
  "/mark-delivered/:id",

  authMiddleware,

  roleMiddleware(
    "volunteer"
  ),

  markDelivered
);

/*
========================================
VOLUNTEER DELIVERIES
========================================
*/

router.get(
  "/volunteer-deliveries",

  authMiddleware,

  roleMiddleware(
    "volunteer"
  ),

  getVolunteerDeliveries
);

/*
========================================
DASHBOARD STATS
========================================
*/

router.get(
  "/stats",

  authMiddleware,

  getDashboardStats
);

/*
========================================
EXPORT ROUTER
========================================
*/

export default router;