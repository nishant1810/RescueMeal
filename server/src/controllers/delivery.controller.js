import asyncHandler
from "../utils/asyncHandler.js";

import ApiResponse
from "../utils/ApiResponse.js";

import ApiError
from "../utils/ApiError.js";

import Delivery
from "../models/delivery.js";

import Food
from "../models/food.js";

/*
========================================
GET AVAILABLE DELIVERIES
========================================
*/

export const
getAvailableDeliveries =
  asyncHandler(

    async (
      req,
      res
    ) => {

      const deliveries =
        await Delivery.find({

          status:
            "pending",
        })

          .populate(
            "food"
          )

          .populate(
            "donor",
            "name email"
          )

          .populate(
            "ngo",
            "name email"
          )

          .sort({

            createdAt: -1,
          });

      return res
        .status(200)
        .json(

          new ApiResponse(

            200,

            deliveries,

            "Available deliveries fetched successfully"
          )
        );
    }
  );

/*
========================================
ACCEPT DELIVERY
========================================
*/

export const
acceptDelivery =
  asyncHandler(

    async (
      req,
      res
    ) => {

      const delivery =
        await Delivery.findById(
          req.params.id
        );

      if (!delivery) {

        throw new ApiError(

          404,

          "Delivery not found"
        );
      }

      if (
        delivery.status !==
        "pending"
      ) {

        throw new ApiError(

          400,

          "Delivery already accepted"
        );
      }

      delivery.status =
        "accepted";

      delivery.volunteer =
        req.user._id;

      delivery.acceptedAt =
        new Date();

      await delivery.save();

      return res
        .status(200)
        .json(

          new ApiResponse(

            200,

            delivery,

            "Delivery accepted successfully"
          )
        );
    }
  );

/*
========================================
MARK DELIVERED
========================================
*/

export const
markDelivered =
  asyncHandler(

    async (
      req,
      res
    ) => {

      const delivery =
        await Delivery.findById(
          req.params.id
        );

      if (!delivery) {

        throw new ApiError(

          404,

          "Delivery not found"
        );
      }

      delivery.status =
        "delivered";

      delivery.deliveredAt =
        new Date();

      await delivery.save();

      await Food.findByIdAndUpdate(

        delivery.food,

        {

          status:
            "delivered",
        }
      );

      return res
        .status(200)
        .json(

          new ApiResponse(

            200,

            delivery,

            "Food delivered successfully"
          )
        );
    }
  );

/*
========================================
GET VOLUNTEER DELIVERIES
========================================
*/

export const
getVolunteerDeliveries =
  asyncHandler(

    async (
      req,
      res
    ) => {

      const deliveries =
        await Delivery.find({

          volunteer:
            req.user._id,
        })

          .populate(
            "food"
          )

          .populate(
            "ngo",
            "name email"
          )

          .populate(
            "donor",
            "name email"
          )

          .sort({

            createdAt: -1,
          });

      return res
        .status(200)
        .json(

          new ApiResponse(

            200,

            deliveries,

            "Volunteer deliveries fetched successfully"
          )
        );
    }
  );

/*
========================================
GET VOLUNTEER HISTORY
========================================
*/

export const
getVolunteerHistory =
  asyncHandler(

    async (
      req,
      res
    ) => {

      const history =
        await Delivery.find({

          volunteer:
            req.user._id,

          status:
            "delivered",
        })

          .populate(
            "food"
          )

          .sort({

            createdAt: -1,
          });

      return res
        .status(200)
        .json(

          new ApiResponse(

            200,

            history,

            "Volunteer history fetched successfully"
          )
        );
    }
  );

  /*
========================================
MARK PICKED
========================================
*/

export const
markPicked =
  asyncHandler(

    async (
      req,
      res
    ) => {

      /*
      ========================================
      FIND DELIVERY
      ========================================
      */

      const delivery =
        await Delivery.findById(
          req.params.id
        );

      /*
      ========================================
      DELIVERY NOT FOUND
      ========================================
      */

      if (!delivery) {

        throw new ApiError(

          404,

          "Delivery not found"
        );
      }

      /*
      ========================================
      UPDATE STATUS
      ========================================
      */

      delivery.status =
        "picked";

      delivery.pickedAt =
        new Date();

      await delivery.save();

      /*
      ========================================
      UPDATE FOOD STATUS
      ========================================
      */

      await Food.findByIdAndUpdate(

        delivery.food,

        {

          status:
            "picked",
        }
      );

      /*
      ========================================
      RESPONSE
      ========================================
      */

      return res
        .status(200)
        .json(

          new ApiResponse(

            200,

            delivery,

            "Food picked successfully"
          )
        );
    }
  );