import express from "express";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import protect from "../middleware/authMiddleware.js";

import {
  donateFood,
  getAllFood,
  claimFood,
  getMyDonations,
  getClaimedFood,
  assignDelivery,
  markDelivered,
  getVolunteerDeliveries,
  getDashboardStats,
} from "../controllers/food.js";


const router =
  express.Router();

router.post(
  "/donate",
  protect,

  // upload.single(
  //   "foodImage"
  // ),

  donateFood
);

router.get(
  "/all",
  protect,
  getAllFood
);

router.put(
  "/claim/:id",
  protect,
  claimFood
);

router.get(
  "/my-donations",
  protect,
  getMyDonations
);

router.get(
  "/claimed-food",
  protect,
  getClaimedFood
);

router.put(
  "/assign/:id",
  protect,
  assignDelivery
);

router.put(
  "/mark-delivered/:id",
  protect,
  markDelivered
);

router.get(
  "/volunteer-deliveries",
  protect,
  getVolunteerDeliveries
);

router.get(
  "/stats",
  protect,
  getDashboardStats
);

export default router;