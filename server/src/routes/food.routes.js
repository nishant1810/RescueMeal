import express
from "express";

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

  getNearbyFood,
}
from "../controllers/food.js";

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
DONOR ONLY
========================================
*/

router.post(
  "/donate",

  authMiddleware,

  roleMiddleware(
    "donor"
  ),

  upload.single(
    "foodImage"
  ),

  donateFood
);

/*
========================================
GET ALL FOOD
NGO ONLY
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
GET NEARBY FOOD
NGO ONLY
========================================
*/

router.get(
  "/nearby",

  authMiddleware,

  roleMiddleware(
    "ngo"
  ),

  getNearbyFood
);

/*
========================================
GET MY DONATIONS
DONOR ONLY
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
NGO ONLY
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
NGO ONLY
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
NGO ONLY
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
VOLUNTEER ONLY
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
VOLUNTEER ONLY
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
ALL AUTHENTICATED USERS
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