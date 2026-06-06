import asyncHandler
from "../utils/asyncHandler.js";

import ApiResponse
from "../utils/ApiResponse.js";

import {

  donateFoodService,

  getAllFoodService,

  claimFoodService,

  getNearbyFoodService,

  getDashboardStatsService,

  getMyDonationsService,

  getClaimedFoodService,

} from "../services/food.service.js";

/*
========================================
DONATE FOOD
========================================
*/

export const
donateFood =
  asyncHandler(

    async (
      req,
      res
    ) => {

      const food =
        await donateFoodService(

          req.body,

          req.file,

          req.user._id
        );

      return res
        .status(201)
        .json(

          new ApiResponse(

            201,

            food,

            "Food donated successfully"
          )
        );
    }
  );

/*
========================================
GET ALL FOOD
========================================
*/

export const
getAllFood =
  asyncHandler(

    async (
      req,
      res
    ) => {

      const foods =
        await getAllFoodService(
          req.query
        );

      return res
        .status(200)
        .json(

          new ApiResponse(

            200,

            foods,

            "Food fetched successfully"
          )
        );
    }
  );

/*
========================================
CLAIM FOOD
========================================
*/

export const
claimFood =
  asyncHandler(

    async (
      req,
      res
    ) => {

      const food =
        await claimFoodService(

          req.params.id,

          req.user._id
        );

      return res
        .status(200)
        .json(

          new ApiResponse(

            200,

            food,

            "Food claimed successfully"
          )
        );
    }
  );

/*
========================================
GET NEARBY FOOD
========================================
*/

export const
getNearbyFood =
  asyncHandler(

    async (
      req,
      res
    ) => {

      const foods =
        await getNearbyFoodService(
          req.query
        );

      return res
        .status(200)
        .json(

          new ApiResponse(

            200,

            foods,

            "Nearby food fetched successfully"
          )
        );
    }
  );

/*
========================================
GET DASHBOARD STATS
========================================
*/

export const
getDashboardStats =
  asyncHandler(

    async (
      req,
      res
    ) => {

      const stats =
        await getDashboardStatsService();

      return res
        .status(200)
        .json(

          new ApiResponse(

            200,

            stats,

            "Dashboard stats fetched successfully"
          )
        );
    }
  );

/*
========================================
GET MY DONATIONS
========================================
*/

export const
getMyDonations =
  asyncHandler(

    async (
      req,
      res
    ) => {

      const donations =
        await getMyDonationsService(

          req.user._id,

          req.query
        );

      return res
        .status(200)
        .json(

          new ApiResponse(

            200,

            donations,

            "Donations fetched successfully"
          )
        );
    }
  );

/*
========================================
GET CLAIMED FOOD
========================================
*/

export const
getClaimedFood =
  asyncHandler(

    async (
      req,
      res
    ) => {

      const foods =
        await getClaimedFoodService(
          req.query
        );

      return res
        .status(200)
        .json(

          new ApiResponse(

            200,

            foods,

            "Claimed food fetched successfully"
          )
        );
    }
  );