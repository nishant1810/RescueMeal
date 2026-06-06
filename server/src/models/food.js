import mongoose from "mongoose";
import {FOOD_STATUS} from "../constants/foodStatus.js";


const foodSchema =
  new mongoose.Schema(
    {
      /*
      ========================================
      FOOD DETAILS
      ========================================
      */

      foodName: {
        type: String,
        required: true,

        trim: true,
      },

      quantity: {
        type: Number,
        required: true,

        min: 1,
      },

      category: {
        type: String,
        required: true,

        trim: true,
      },

      location: {
        type: String,
        required: true,

        trim: true,
      },

      expiryTime: {
        type: Date,
        required: true,
      },

      description: {
        type: String,

        trim: true,
      },

      foodImage: {
        type: String,

        default: "",
      },

      /*
      ========================================
      GEO LOCATION
      ========================================
      */

      coordinates: {
        type: {
          type: String,

          enum: ["Point"],

          default: "Point",
        },

        coordinates: {
          type: [Number],

          default: [0, 0],
        },
      },

      /*
      ========================================
      DONOR
      ========================================
      */

      donor: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",

        required: true,
      },

      /*
      ========================================
      CLAIMED NGO
      ========================================
      */

      claimedBy: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",
      },

      /*
      ========================================
      VOLUNTEER
      ========================================
      */

      volunteer: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",
      },

      /*
      ========================================
      FOOD STATUS
      ========================================
      */

      status: {
        type: String,

        enum:
        Object.values(
          FOOD_STATUS
        ),

        default: "available",
      },
    },

    {
      timestamps: true,
    }
  );

/*
========================================
GEO SPATIAL INDEX
========================================
*/

foodSchema.index({
  coordinates: "2dsphere",
});

/*
========================================
MODEL
========================================
*/

const Food =
  mongoose.models.Food ||

  mongoose.model(
    "Food",
    foodSchema
  );

export default Food;