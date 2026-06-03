import Food from "../models/Food.js";

import { io } from "../server.js";

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
      GET FORM DATA
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
      CREATE FOOD
      ========================================
      */

      const food =
        await Food.create({
          foodName,

          quantity,

          category,

          location,

          expiryTime,

          description,

          foodImage:
            req.file?.path ||
            "",

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
            "New Food Donation Added",

          food,
        }
      );

      /*
      ========================================
      RESPONSE
      ========================================
      */

      res.status(201).json({
        success: true,

        message:
          "Food donated successfully",

        food,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
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
          .limit(limit);

      /*
      ========================================
      RESPONSE
      ========================================
      */

      res.status(200).json({
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
      console.log(error);

      res.status(500).json({
        success: false,

        message:
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
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,

        foods,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
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
      FIND FOOD
      ========================================
      */

      const food =
        await Food.findById(
          req.params.id
        );

      /*
      ========================================
      VALIDATION
      ========================================
      */

      if (!food) {
        return res.status(404).json({
          success: false,

          message:
            "Food not found",
        });
      }

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
            "Food Claimed",

          food,
        }
      );

      /*
      ========================================
      RESPONSE
      ========================================
      */

      res.status(200).json({
        success: true,

        message:
          "Food claimed successfully",

        food,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
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
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,

        foods,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
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
      FIND FOOD
      ========================================
      */

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
      ASSIGN VOLUNTEER
      ========================================
      */

      food.volunteer =
        volunteerId;

      await food.save();

      /*
      ========================================
      RESPONSE
      ========================================
      */

      res.status(200).json({
        success: true,

        message:
          "Volunteer assigned successfully",

        food,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
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
      /*
      ========================================
      FIND FOOD
      ========================================
      */

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
            "Food Delivered",

          food,
        }
      );

      /*
      ========================================
      RESPONSE
      ========================================
      */

      res.status(200).json({
        success: true,

        message:
          "Food delivered successfully",

        food,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
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
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,

        foods,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
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
      /*
      ========================================
      USER
      ========================================
      */

      const userId =
        req.user._id;

      /*
      ========================================
      STATS
      ========================================
      */

      const totalDonations =
        await Food.countDocuments({
          donor: userId,
        });

      const availableFood =
        await Food.countDocuments({
          donor: userId,

          status:
            "available",
        });

      const claimedFood =
        await Food.countDocuments({
          donor: userId,

          status:
            "claimed",
        });

      const deliveredFood =
        await Food.countDocuments({
          donor: userId,

          status:
            "delivered",
        });

      const pickedDeliveries =
        await Food.countDocuments({
          volunteer:
            userId,
        });

      /*
      ========================================
      RESPONSE
      ========================================
      */

      res.status(200).json({
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
      console.log(error);

      res.status(500).json({
        success: false,

        message:
          "Failed to fetch dashboard stats",
      });
    }
  };