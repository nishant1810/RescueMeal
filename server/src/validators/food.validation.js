import { z }
from "zod";

/*
========================================
DONATE FOOD VALIDATION
========================================
*/

export const
donateFoodSchema =
  z.object({

    foodName:
      z.string()

        .trim()

        .min(
          2,
          "Food name is required"
        ),

    quantity:
      z.coerce.number()

        .min(
          1,
          "Quantity must be greater than 0"
        ),

    category:
      z.string()

        .trim()

        .min(
          1,
          "Category is required"
        ),

    location:
      z.string()

        .trim()

        .min(
          1,
          "Location is required"
        ),

    /*
    ========================================
    FIXED EXPIRY TIME VALIDATION
    ========================================
    */

    expiryTime:
      z.string()

        .trim()

        .min(
          1,
          "Expiry time is required"
        ),

    description:
      z.string()

        .trim()

        .optional(),

    latitude:
      z.coerce.number()

        .optional(),

    longitude:
      z.coerce.number()

        .optional(),
  });

/*
========================================
CLAIM FOOD VALIDATION
========================================
*/

export const
claimFoodSchema =
  z.object({

    id:
      z.string()

        .trim()

        .min(
          1,
          "Food ID is required"
        ),
  });

/*
========================================
NEARBY FOOD VALIDATION
========================================
*/

export const
nearbyFoodSchema =
  z.object({

    lat:
      z.coerce.number({

        invalid_type_error:
          "Latitude must be a number",
      }),

    lng:
      z.coerce.number({

        invalid_type_error:
          "Longitude must be a number",
      }),

    distance:
      z.coerce.number()

        .optional(),
  });