import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  donateFood,
  getAllFood,
  getMyDonations,
  claimFood,
  getDashboardStats,
} from "../controllers/food.js";

const router = express.Router();

/*
========================================
DONATE FOOD
========================================
*/

router.post(
  "/donate",
  authMiddleware,
  upload.single("foodImage"),
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
  claimFood
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

export default router;