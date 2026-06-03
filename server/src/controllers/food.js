import Food from "../models/Food.js";

import mongoose from "mongoose";

import { io } from "../server.js";


console.log(
  "FOOD CONTROLLER LOADED"
);
/*
========================================
DONATE FOOD
========================================
*/

export const donateFood =
  async (req, res) => {
    try {
      /*
      ========================================
      DEBUG LOGS
      ========================================
      */

      console.log(
        "REQ BODY:",
        req.body
      );

      console.log(
        "REQ FILE:",
        req.file
      );

      /*
      ========================================
      BODY DATA
      ========================================
      */

      const {
        foodName,
        quantity,
        category,
        location,
        expiryTime,
        description,
      } = req.body;

      /*
      ========================================
      VALIDATION
      ========================================
      */

      if (
        !foodName ||
        !quantity ||
        !category ||
        !location ||
        !expiryTime
      ) {
        return res.status(400).json({
          success: false,

          message:
            "All required fields are required",
        });
      }

      /*
      ========================================
      IMAGE URL
      ========================================
      */

      let imageUrl = "";

      if (req.file) {
        imageUrl =
          req.file.path;
      }

      /*
      ========================================
      CREATE FOOD
      ========================================
      */

      const food =
        await Food.create({
          foodName,

          quantity:
            Number(quantity),

          category,

          location,

          expiryTime,

          description,

          foodImage:
            imageUrl,

          donor:
            req.user._id,

          status:
            "available",
        });

      /*
      ========================================
      SOCKET EVENT
      ========================================
      */

      io.emit(
        "newFoodDonation",
        {
          message:
            "New food donated successfully",

          food,
        }
      );

      /*
      ========================================
      RESPONSE
      ========================================
      */

      return res.status(201).json({
        success: true,

        message:
          "Food donated successfully",

        food,
      });
    } catch (error) {
      /*
      ========================================
      ERROR LOG
      ========================================
      */

      console.log(
        "DONATE FOOD ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message ||
          "Failed to donate food",
      });
    }
  };

/*
========================================
GET ALL FOOD
========================================
*/

export const getAllFood =
  async (req, res) => {
    try {
      /*
      ========================================
      PAGINATION
      ========================================
      */

      const page =
        Number(
          req.query.page
        ) || 1;

      const limit =
        Number(
          req.query.limit
        ) || 6;

      const skip =
        (page - 1) * limit;

      /*
      ========================================
      TOTAL FOOD
      ========================================
      */

      const totalFoods =
        await Food.countDocuments({
          status:
            "available",
        });

      /*
      ========================================
      FETCH FOOD
      ========================================
      */

      const foods =
        await Food.find({
          status:
            "available",
        })
          .populate(
            "donor",
            "name email"
          )
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(limit)
          .lean();

      /*
      ========================================
      RESPONSE
      ========================================
      */

      return res.status(200).json({
        success: true,

        foods,

        currentPage:
          page,

        totalPages:
          Math.ceil(
            totalFoods /
              limit
          ),

        totalFoods,
      });
    } catch (error) {
      console.log(
        "GET ALL FOOD ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message ||
          "Failed to fetch food",
      });
    }
  };

/*
========================================
GET MY DONATIONS
========================================
*/

export const getMyDonations =
  async (req, res) => {
    try {
      const foods =
        await Food.find({
          donor:
            req.user._id,
        })
          .sort({
            createdAt: -1,
          })
          .lean();

      return res.status(200).json({
        success: true,

        foods,
      });
    } catch (error) {
      console.log(
        "MY DONATIONS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message ||
          "Failed to fetch donations",
      });
    }
  };

/*
========================================
CLAIM FOOD
========================================
*/

export const claimFood =
  async (req, res) => {
    try {
      /*
      ========================================
      VALID OBJECT ID
      ========================================
      */

      if (
        !mongoose.Types.ObjectId.isValid(
          req.params.id
        )
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Invalid food ID",
        });
      }

      const food =
        await Food.findById(
          req.params.id
        );

      /*
      ========================================
      FOOD NOT FOUND
      ========================================
      */

      if (!food) {
        return res.status(404).json({
          success: false,

          message:
            "Food not found",
        });
      }

      /*
      ========================================
      ALREADY CLAIMED
      ========================================
      */

      if (
        food.status !==
        "available"
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Food already claimed",
        });
      }

      /*
      ========================================
      UPDATE FOOD
      ========================================
      */

      food.status =
        "claimed";

      food.claimedBy =
        req.user._id;

      await food.save();

      /*
      ========================================
      SOCKET EVENT
      ========================================
      */

      io.emit(
        "foodClaimed",
        {
          message:
            "Food claimed successfully",

          food,
        }
      );

      return res.status(200).json({
        success: true,

        message:
          "Food claimed successfully",

        food,
      });
    } catch (error) {
      console.log(
        "CLAIM FOOD ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message ||
          "Failed to claim food",
      });
    }
  };

/*
========================================
GET CLAIMED FOOD
========================================
*/

export const getClaimedFood =
  async (req, res) => {
    try {
      const foods =
        await Food.find({
          status:
            "claimed",
        })
          .populate(
            "claimedBy",
            "name email"
          )
          .populate(
            "donor",
            "name email"
          )
          .sort({
            createdAt: -1,
          })
          .lean();

      return res.status(200).json({
        success: true,

        foods,
      });
    } catch (error) {
      console.log(
        "GET CLAIMED FOOD ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message ||
          "Failed to fetch claimed food",
      });
    }
  };

/*
========================================
ASSIGN DELIVERY
========================================
*/

export const assignDelivery =
  async (req, res) => {
    try {
      const {
        volunteerId,
      } = req.body;

      /*
      ========================================
      VALIDATION
      ========================================
      */

      if (!volunteerId) {
        return res.status(400).json({
          success: false,

          message:
            "Volunteer ID is required",
        });
      }

      const food =
        await Food.findById(
          req.params.id
        );

      if (!food) {
        return res.status(404).json({
          success: false,

          message:
            "Food not found",
        });
      }

      /*
      ========================================
      ALREADY ASSIGNED
      ========================================
      */

      if (
        food.volunteer
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Volunteer already assigned",
        });
      }

      /*
      ========================================
      ASSIGN VOLUNTEER
      ========================================
      */

      food.volunteer =
        volunteerId;

      await food.save();

      return res.status(200).json({
        success: true,

        message:
          "Volunteer assigned successfully",

        food,
      });
    } catch (error) {
      console.log(
        "ASSIGN DELIVERY ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message ||
          "Failed to assign volunteer",
      });
    }
  };

/*
========================================
MARK DELIVERED
========================================
*/

export const markDelivered =
  async (req, res) => {
    try {
      const food =
        await Food.findById(
          req.params.id
        );

      /*
      ========================================
      FOOD NOT FOUND
      ========================================
      */

      if (!food) {
        return res.status(404).json({
          success: false,

          message:
            "Food not found",
        });
      }

      /*
      ========================================
      ALREADY DELIVERED
      ========================================
      */

      if (
        food.status ===
        "delivered"
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Food already delivered",
        });
      }

      /*
      ========================================
      UPDATE STATUS
      ========================================
      */

      food.status =
        "delivered";

      await food.save();

      /*
      ========================================
      SOCKET EVENT
      ========================================
      */

      io.emit(
        "foodDelivered",
        {
          message:
            "Food delivered successfully",

          food,
        }
      );

      return res.status(200).json({
        success: true,

        message:
          "Food delivered successfully",

        food,
      });
    } catch (error) {
      console.log(
        "MARK DELIVERED ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message ||
          "Failed to mark delivery",
      });
    }
  };

/*
========================================
VOLUNTEER DELIVERIES
========================================
*/

export const getVolunteerDeliveries =
  async (req, res) => {
    try {
      const foods =
        await Food.find({
          volunteer:
            req.user._id,
        })
          .populate(
            "donor",
            "name email"
          )
          .sort({
            createdAt: -1,
          })
          .lean();

      return res.status(200).json({
        success: true,

        foods,
      });
    } catch (error) {
      console.log(
        "VOLUNTEER DELIVERY ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message ||
          "Failed to fetch deliveries",
      });
    }
  };

/*
========================================
GET DASHBOARD STATS
========================================
*/

export const getDashboardStats =
  async (req, res) => {
    try {
      const userId =
        req.user._id;

      /*
      ========================================
      PARALLEL QUERIES
      ========================================
      */

      const [
        totalDonations,
        availableFood,
        claimedFood,
        deliveredFood,
        pickedDeliveries,
      ] = await Promise.all([
        Food.countDocuments({
          donor: userId,
        }),

        Food.countDocuments({
          donor: userId,
          status:
            "available",
        }),

        Food.countDocuments({
          donor: userId,
          status:
            "claimed",
        }),

        Food.countDocuments({
          donor: userId,
          status:
            "delivered",
        }),

        Food.countDocuments({
          volunteer:
            userId,
        }),
      ]);

      return res.status(200).json({
        success: true,

        stats: {
          totalDonations,

          availableFood,

          claimedFood,

          deliveredFood,

          pickedDeliveries,
        },
      });
    } catch (error) {
      console.log(
        "DASHBOARD STATS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message ||
          "Failed to fetch dashboard stats",
      });
    }
  };