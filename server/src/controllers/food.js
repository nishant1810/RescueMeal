import Food from "../models/food.js";

import { io } from "../server.js";

/*
========================================
DONATE FOOD
========================================
*/

export const donateFood =
  async (req, res) => {
    try {
      console.log(req.body);

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
      IMAGE
      ========================================
      */

      const foodImage =
        req.file
          ? `/uploads/${req.file.filename}`
          : "";

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

          foodImage,

          donor:
            req.user._id,

          status:
            "Available",
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
            "New food donation added",

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
        await Food.find()
          .populate(
            "donor",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,

        food: foods,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message:
          error.message,
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
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Food not found",
          });
      }

      food.status =
        "Claimed";

      food.claimedBy =
        req.user._id;

      await food.save();

      io.emit(
        "foodClaimed",
        {
          message:
            "Food claimed",

          food,
        }
      );

      res.status(200).json({
        success: true,

        message:
          "Food claimed successfully",

        food,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };

/*
========================================
MY DONATIONS
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
      res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };

/*
========================================
CLAIMED FOOD
========================================
*/

export const getClaimedFood =
  async (req, res) => {
    try {
      const foods =
        await Food.find({
          claimedBy:
            req.user._id,
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
      const food =
        await Food.findById(
          req.params.id
        );

      if (!food) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Food not found",
          });
      }

      food.deliveryPartner =
        req.user._id;

      food.status =
        "Out for Delivery";

      await food.save();

      res.status(200).json({
        success: true,

        message:
          "Delivery assigned",

        food,
      });
    } catch (error) {
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
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Food not found",
          });
      }

      food.status =
        "Delivered";

      await food.save();

      res.status(200).json({
        success: true,

        message:
          "Food delivered successfully",

        food,
      });
    } catch (error) {
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
          deliveryPartner:
            req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,

        foods,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };

/*
========================================
DASHBOARD STATS
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
              "Available",
          }
        );

      const claimedFood =
        await Food.countDocuments(
          {
            status:
              "Claimed",
          }
        );

      const deliveredFood =
        await Food.countDocuments(
          {
            status:
              "Delivered",
          }
        );

      const pickedFood =
        await Food.countDocuments(
          {
            status:
              "Out for Delivery",
          }
        );

      res.status(200).json({
        totalFood,

        availableFood,

        claimedFood,

        deliveredFood,

        pickedFood,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };