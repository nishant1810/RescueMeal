import Food
from "../models/food.js";

/*
========================================
COUNT FOOD
========================================
*/

export const
countFood =
  async (filter = {}) => {

    return Food.countDocuments(
      filter
    );
  };

/*
========================================
GET ALL FOOD
========================================
*/

export const
findAvailableFood =
  async (
    skip,
    limit
  ) => {

    return Food.find({

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
  };

/*
========================================
CREATE FOOD
========================================
*/

export const
createFood =
  async (data) => {

    return Food.create(data);
  };

/*
========================================
FIND FOOD BY ID
========================================
*/

export const
findFoodById =
  async (
    foodId,
    session = null
  ) => {

    const query =
      Food.findById(foodId);

    if (session) {

      query.session(
        session
      );
    }

    return query;
  };

/*
========================================
SAVE FOOD
========================================
*/

export const
saveFood =
  async (
    food,
    session = null
  ) => {

    return food.save({
      session,
    });
  };

/*
========================================
GET NEARBY FOOD
========================================
*/

export const
findNearbyFood =
  async (
    lng,
    lat,
    maxDistance
  ) => {

    return Food.find({

      status:
        "available",

      coordinates: {

        $near: {

          $geometry: {

            type:
              "Point",

            coordinates: [

              lng,
              lat,
            ],
          },

          $maxDistance:
            maxDistance,
        },
      },
    })

      .populate(
        "donor",
        "name email"
      )

      .sort({

        createdAt: -1,
      })

      .lean();
  };

/*
========================================
GET MY DONATIONS
========================================
*/

export const
findMyDonations =
  async (
    userId,
    skip,
    limit
  ) => {

    return Food.find({

      donor:
        userId,
    })

      .sort({

        createdAt: -1,
      })

      .skip(skip)

      .limit(limit)

      .lean();
  };

/*
========================================
GET CLAIMED FOOD
========================================
*/

export const
findClaimedFood =
  async (
    skip,
    limit
  ) => {

    return Food.find({

      status:
        "claimed",
    })

      .populate(
        "claimedBy",
        "name email role"
      )

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
  };