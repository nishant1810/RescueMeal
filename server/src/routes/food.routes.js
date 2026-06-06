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

import validate
from "../middleware/zodValidation.middleware.js";

/*
========================================
VALIDATORS
========================================
*/

import {

  donateFoodSchema,

  claimFoodSchema,

  nearbyFoodSchema,

} from "../validators/food.validation.js";

/*
========================================
CONSTANTS
========================================
*/

import { ROLES }
from "../constants/roles.js";

/*
========================================
FOOD CONTROLLERS
========================================
*/

import {

  donateFood,

  getAllFood,

  getMyDonations,

  claimFood,

  getDashboardStats,

  getClaimedFood,

  getNearbyFood,

} from "../controllers/food.controller.js";

/*
========================================
DELIVERY CONTROLLERS
========================================
*/

import {

  markDelivered,

  getVolunteerDeliveries,

} from "../controllers/delivery.controller.js";

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
POST /api/v1/food/donate
========================================
*/

router.post(

  "/donate",

  authMiddleware,

  roleMiddleware(
    ROLES.DONOR
  ),

  upload.single(
    "foodImage"
  ),

  validate(
    donateFoodSchema
  ),

  donateFood
);

/*
========================================
GET ALL FOOD
NGO ONLY
GET /api/v1/food/all
========================================
*/

router.get(

  "/all",

  authMiddleware,

  roleMiddleware(
    ROLES.NGO
  ),

  getAllFood
);

/*
========================================
GET NEARBY FOOD
NGO ONLY
GET /api/v1/food/nearby
========================================
*/

router.get(

  "/nearby",

  authMiddleware,

  roleMiddleware(
    ROLES.NGO
  ),

  validate(
    nearbyFoodSchema
  ),

  getNearbyFood
);

/*
========================================
GET MY DONATIONS
DONOR ONLY
GET /api/v1/food/my-donations
========================================
*/

router.get(

  "/my-donations",

  authMiddleware,

  roleMiddleware(
    ROLES.DONOR
  ),

  getMyDonations
);

/*
========================================
CLAIM FOOD
NGO ONLY
PUT /api/v1/food/claim/:id
========================================
*/

router.put(

  "/claim/:id",

  authMiddleware,

  roleMiddleware(
    ROLES.NGO
  ),

  validate(
    claimFoodSchema
  ),

  claimFood
);

/*
========================================
GET CLAIMED FOOD
NGO ONLY
GET /api/v1/food/claimed-food
========================================
*/

router.get(

  "/claimed-food",

  authMiddleware,

  roleMiddleware(
    ROLES.NGO
  ),

  getClaimedFood
);

/*
========================================
MARK DELIVERED
VOLUNTEER ONLY
PUT /api/v1/food/mark-delivered/:id
========================================
*/

router.put(

  "/mark-delivered/:id",

  authMiddleware,

  roleMiddleware(
    ROLES.VOLUNTEER
  ),

  markDelivered
);

/*
========================================
VOLUNTEER DELIVERIES
VOLUNTEER ONLY
GET /api/v1/food/volunteer-deliveries
========================================
*/

router.get(

  "/volunteer-deliveries",

  authMiddleware,

  roleMiddleware(
    ROLES.VOLUNTEER
  ),

  getVolunteerDeliveries
);

/*
========================================
DASHBOARD STATS
ALL AUTHENTICATED USERS
GET /api/v1/food/stats
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