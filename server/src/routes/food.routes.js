import express from "express";

import upload from "../middleware/upload.js";

import protect from "../middleware/authMiddleware.js";

import {
  donateFood,
  getAllFood,
  getMyDonations,
  claimFood,
  getDashboardStats,
} from "../controllers/food.js";

const router =
  express.Router();

/*
========================================
DONATE FOOD
========================================
*/

router.post(
  "/donate",

  protect,

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

  protect,

  getAllFood
);

/*
========================================
MY DONATIONS
========================================
*/

router.get(
  "/my-donations",

  protect,

  getMyDonations
);

/*
========================================
CLAIM FOOD
========================================
*/

router.put(
  "/claim/:id",

  protect,

  claimFood
);

/*
========================================
DASHBOARD STATS
========================================
*/

router.get(
  "/stats",

  protect,

  getDashboardStats
);

export default router;