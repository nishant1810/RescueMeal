import mongoose from "mongoose";
import {DELIVERY_STATUS} from "../constants/deliveryStatus.js";

/*
========================================
DELIVERY SCHEMA
========================================
*/

const deliverySchema =
  new mongoose.Schema(
    {
      /*
      ========================================
      FOOD
      ========================================
      */

      food: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Food",

        required: true,
      },

      /*
      ========================================
      DONOR
      ========================================
      */

      donor: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      /*
      ========================================
      NGO
      ========================================
      */

      ngo: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      /*
      ========================================
      VOLUNTEER
      ========================================
      */

      volunteer: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        default: null,
      },

      /*
      ========================================
      DELIVERY STATUS
      ========================================
      */

      status: {
        type: String,

        enum:
        Object.values(
          DELIVERY_STATUS
        ),

        default: "pending",
      },

      /*
      ========================================
      DELIVERY DETAILS
      ========================================
      */

      pickupAddress: {
        type: String,

        required: true,
      },

      deliveryAddress: {
        type: String,

        required: true,
      },

      /*
      ========================================
      TIMESTAMPS
      ========================================
      */

      acceptedAt: Date,

      pickedAt: Date,

      deliveredAt: Date,

      cancelledAt: Date,

      /*
      ========================================
      NOTES
      ========================================
      */

      notes: {
        type: String,

        trim: true,
      },
    },

    {
      timestamps: true,
    }
  );

/*
========================================
INDEXES
========================================
*/

deliverySchema.index({
  status: 1,
});

deliverySchema.index({
  volunteer: 1,
});

deliverySchema.index({
  ngo: 1,
});

deliverySchema.index({
  donor: 1,
});

/*
========================================
MODEL
========================================
*/

const Delivery =
  mongoose.model(
    "Delivery",
    deliverySchema
  );

export default Delivery;