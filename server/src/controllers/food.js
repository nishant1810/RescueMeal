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
      DEBUG
      ========================================
      */

      console.log(req.body);

      console.log(req.file);

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
            req.file
              ? req.file.path
              : "",

          donor: req.user.id,

          status: "available",
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
            "New Food Donation",

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
          error.message,
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
      const foods =
        await Food.find({
          status: "available",
        })
          .populate(
            "donor",
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
          error.message,
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
          donor: req.user.id,
        }).sort({
          createdAt: -1,
        });

      console.log(
        "MY DONATIONS:",
        foods
      );

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

      food.status = "claimed";

      food.claimedBy =
        req.user.id;

      await food.save();

      /*
      ========================================
      SOCKET EVENT
      ========================================
      */

      io.emit("foodClaimed", {
        food,
      });

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
          error.message,
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
          status: "claimed",
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
          error.message,
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

      food.volunteer =
        volunteerId;

      await food.save();

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
          error.message,
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

      if (!food) {
        return res.status(404).json({
          success: false,

          message:
            "Food not found",
        });
      }

      food.status =
        "delivered";

      await food.save();

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
          error.message,
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
            req.user.id,
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
          error.message,
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
      const totalFood =
        await Food.countDocuments();

      const availableFood =
        await Food.countDocuments(
          {
            status:
              "available",
          }
        );

      const claimedFood =
        await Food.countDocuments(
          {
            status:
              "claimed",
          }
        );

      const deliveredFood =
        await Food.countDocuments(
          {
            status:
              "delivered",
          }
        );

      res.status(200).json({
        success: true,

        totalFood,

        availableFood,

        claimedFood,

        deliveredFood,

        pickedFood:
          claimedFood,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };