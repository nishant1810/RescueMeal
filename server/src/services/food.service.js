import mongoose
from "mongoose";

import {
  FOOD_STATUS,
} from "../constants/foodStatus.js";

import ApiError
from "../utils/ApiError.js";

import { getIO }
from "../socket/socket.js";

import {
  redisClient,
} from "../config/redis.js";

import {

  countFood,

  findAvailableFood,

  createFood,

  findFoodById,

  saveFood,

  findNearbyFood,

  findMyDonations,

  findClaimedFood,

} from "../repositories/food.repository.js";

/*
========================================
GET ALL FOOD SERVICE
========================================
*/

export const
getAllFoodService =
  async (query) => {

    /*
    ========================================
    PAGINATION
    ========================================
    */

    const page =
      Math.max(
        1,
        Number(query.page) || 1
      );

    const limit =
      Math.min(
        50,
        Number(query.limit) || 6
      );

    const skip =
      (page - 1) * limit;

    /*
    ========================================
    TOTAL FOOD
    ========================================
    */

    const totalFoods =
      await countFood({

        status:
          FOOD_STATUS.AVAILABLE,
      });

    /*
    ========================================
    FETCH FOOD
    ========================================
    */

    const foods =
      await findAvailableFood(

        skip,

        limit
      );

    /*
    ========================================
    RETURN DATA
    ========================================
    */

    return {

      foods,

      pagination: {

        currentPage:
          page,

        totalPages:
          Math.ceil(
            totalFoods / limit
          ),

        totalFoods,

        limit,
      },
    };
  };

/*
========================================
DONATE FOOD SERVICE
========================================
*/

export const
donateFoodService =
  async (
    body,
    file,
    userId
  ) => {

    const {

      foodName,

      quantity,

      category,

      location,

      expiryTime,

      description,

      latitude,

      longitude,

    } = body;

    /*
    ========================================
    VALIDATION
    ========================================
    */

    if (

      !foodName?.trim() ||

      quantity ===
        undefined ||

      !category?.trim() ||

      !location?.trim() ||

      !expiryTime

    ) {

      throw new ApiError(

        400,

        "All required fields are required"
      );
    }

    /*
    ========================================
    QUANTITY VALIDATION
    ========================================
    */

    if (
      Number(quantity) <= 0
    ) {

      throw new ApiError(

        400,

        "Quantity must be greater than 0"
      );
    }

    /*
    ========================================
    EXPIRED FOOD CHECK
    ========================================
    */

    if (

      new Date(
        expiryTime
      ) <= new Date()

    ) {

      throw new ApiError(

        400,

        "Food already expired"
      );
    }

    /*
    ========================================
    IMAGE URL
    ========================================
    */

    let imageUrl = "";

    if (file?.path) {

      imageUrl =
        file.path.replace(
          /\\/g,
          "/"
        );
    }

    /*
    ========================================
    CREATE FOOD
    ========================================
    */

    const food =
      await createFood({

        foodName:
          foodName.trim(),

        quantity:
          Number(quantity),

        category:
          category.trim(),

        location:
          location.trim(),

        expiryTime:
          new Date(
            expiryTime
          ),

        description:
          description?.trim() || "",

        foodImage:
          imageUrl,

        donor:
          userId,

        coordinates: {

          type:
            "Point",

          coordinates: [

            Number(
              longitude
            ) || 0,

            Number(
              latitude
            ) || 0,
          ],
        },

        status:
          FOOD_STATUS.AVAILABLE,
      });

    /*
    ========================================
    SOCKET EVENT
    ========================================
    */

    try {

      getIO().emit(

        "newFoodDonation",

        {

          message:
            "New food donated successfully",

          food,
        }
      );

    } catch (socketError) {

      console.log(
        "SOCKET ERROR:",
        socketError.message
      );
    }

    /*
    ========================================
    RETURN FOOD
    ========================================
    */

    return food;
  };

/*
========================================
CLAIM FOOD SERVICE
========================================
*/

export const
claimFoodService =
  async (
    foodId,
    userId
  ) => {

    /*
    ========================================
    VALID OBJECT ID
    ========================================
    */

    if (

      !mongoose.Types
        .ObjectId.isValid(
          foodId
        )

    ) {

      throw new ApiError(

        400,

        "Invalid food ID"
      );
    }

    /*
    ========================================
    START SESSION
    ========================================
    */

    const session =
      await mongoose
        .startSession();

    session.startTransaction();

    try {

      /*
      ========================================
      FIND FOOD
      ========================================
      */

      const food =
        await findFoodById(

          foodId,

          session
        );

      /*
      ========================================
      FOOD NOT FOUND
      ========================================
      */

      if (!food) {

        throw new ApiError(

          404,

          "Food not found"
        );
      }

      /*
      ========================================
      FOOD ALREADY CLAIMED
      ========================================
      */

      if (

        food.status !==
        FOOD_STATUS.AVAILABLE

      ) {

        throw new ApiError(

          400,

          "Food already claimed"
        );
      }

      /*
      ========================================
      UPDATE FOOD
      ========================================
      */

      food.status =
        FOOD_STATUS.CLAIMED;

      food.claimedBy =
        userId;

      await saveFood(

        food,

        session
      );

      /*
      ========================================
      COMMIT TRANSACTION
      ========================================
      */

      await session.commitTransaction();

      /*
      ========================================
      SOCKET EVENT
      ========================================
      */

      try {

        getIO().emit(

          "foodClaimed",

          {

            message:
              "Food claimed successfully",

            food,
          }
        );

      } catch (socketError) {

        console.log(
          "SOCKET ERROR:",
          socketError.message
        );
      }

      /*
      ========================================
      RETURN FOOD
      ========================================
      */

      return food;

    } catch (error) {

      /*
      ========================================
      ABORT TRANSACTION
      ========================================
      */

      if (
        session.inTransaction()
      ) {

        await session.abortTransaction();
      }

      throw error;

    } finally {

      /*
      ========================================
      END SESSION
      ========================================
      */

      session.endSession();
    }
  };

/*
========================================
GET NEARBY FOOD SERVICE
========================================
*/

export const
getNearbyFoodService =
  async (query) => {

    const {

      lat,

      lng,

      distance = 5000,

    } = query;

    /*
    ========================================
    VALIDATION
    ========================================
    */

    if (
      !lat ||
      !lng
    ) {

      throw new ApiError(

        400,

        "Latitude and longitude are required"
      );
    }

    /*
    ========================================
    DISTANCE LIMIT
    ========================================
    */

    const maxDistance =
      Math.min(

        10000,

        Number(distance)
      );

    /*
    ========================================
    GEO SEARCH
    ========================================
    */

    const foods =
      await findNearbyFood(

        Number(lng),

        Number(lat),

        maxDistance
      );

    /*
    ========================================
    RETURN DATA
    ========================================
    */

    return {

      count:
        foods.length,

      foods,
    };
  };

/*
========================================
GET DASHBOARD STATS SERVICE
========================================
*/

export const
getDashboardStatsService =
  async () => {

    /*
    ========================================
    CACHE KEY
    ========================================
    */

    const cacheKey =
      "dashboard:stats";

    /*
    ========================================
    CHECK CACHE
    ========================================
    */

    const cachedStats =
      await redisClient.get(
        cacheKey
      );

    if (cachedStats) {

      return JSON.parse(
        cachedStats
      );
    }

    /*
    ========================================
    FETCH STATS
    ========================================
    */

    const [

      totalDonations,

      availableFood,

      claimedFood,

      deliveredFood,

      pickedFood,

    ] = await Promise.all([

      countFood(),

      countFood({

        status:
          FOOD_STATUS.AVAILABLE,
      }),

      countFood({

        status:
          FOOD_STATUS.CLAIMED,
      }),

      countFood({

        status:
          FOOD_STATUS.DELIVERED,
      }),

      countFood({

        status:
          FOOD_STATUS.PICKED,
      }),
    ]);

    /*
    ========================================
    RESPONSE DATA
    ========================================
    */

    const stats = {

      totalDonations,

      availableFood,

      claimedFood,

      deliveredFood,

      pickedFood,
    };

    /*
    ========================================
    STORE CACHE
    ========================================
    */

    await redisClient.set(

      cacheKey,

      JSON.stringify(
        stats
      ),

      {
        EX: 60,
      }
    );

    /*
    ========================================
    RETURN STATS
    ========================================
    */

    return stats;
  };

/*
========================================
GET MY DONATIONS SERVICE
========================================
*/

export const
getMyDonationsService =
  async (
    userId,
    query
  ) => {

    /*
    ========================================
    PAGINATION
    ========================================
    */

    const page =
      Math.max(
        1,
        Number(query.page) || 1
      );

    const limit =
      Math.min(
        50,
        Number(query.limit) || 10
      );

    const skip =
      (page - 1) * limit;

    /*
    ========================================
    TOTAL DONATIONS
    ========================================
    */

    const totalDonations =
      await countFood({

        donor:
          userId,
      });

    /*
    ========================================
    FETCH DONATIONS
    ========================================
    */

    const foods =
      await findMyDonations(

        userId,

        skip,

        limit
      );

    /*
    ========================================
    RETURN DATA
    ========================================
    */

    return {

      foods,

      pagination: {

        currentPage:
          page,

        totalPages:
          Math.ceil(
            totalDonations /
            limit
          ),

        totalDonations,

        limit,
      },
    };
  };

/*
========================================
GET CLAIMED FOOD SERVICE
========================================
*/

export const
getClaimedFoodService =
  async (query) => {

    /*
    ========================================
    PAGINATION
    ========================================
    */

    const page =
      Math.max(
        1,
        Number(query.page) || 1
      );

    const limit =
      Math.min(
        50,
        Number(query.limit) || 10
      );

    const skip =
      (page - 1) * limit;

    /*
    ========================================
    TOTAL CLAIMED FOOD
    ========================================
    */

    const totalClaimedFood =
      await countFood({

        status:
          FOOD_STATUS.CLAIMED,
      });

    /*
    ========================================
    FETCH CLAIMED FOOD
    ========================================
    */

    const foods =
      await findClaimedFood(

        skip,

        limit
      );

    /*
    ========================================
    RETURN DATA
    ========================================
    */

    return {

      foods,

      pagination: {

        currentPage:
          page,

        totalPages:
          Math.ceil(
            totalClaimedFood /
            limit
          ),

        totalClaimedFood,

        limit,
      },
    };
  };