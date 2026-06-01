import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    /*
    ========================================
    FOOD INFORMATION
    ========================================
    */

    foodName: {
      type: String,
      required: true,
      trim: true,

      index: true,
    },

    quantity: {
      type: Number,
      required: true,

      min: 1,
    },

    category: {
      type: String,

      enum: [
        "veg",
        "non-veg",
        "vegan",
        "dessert",
        "beverage",
        "other",
      ],

      default: "other",
    },

    description: {
      type: String,

      trim: true,
    },

    /*
    ========================================
    LOCATION
    ========================================
    */

    location: {
      type: String,
      required: true,

      trim: true,

      index: true,
    },

    /*
    ========================================
    EXPIRY
    ========================================
    */

    expiryTime: {
      type: Date,
      required: true,

      index: true,
    },

    /*
    ========================================
    FOOD STATUS
    ========================================
    */

    status: {
      type: String,

      enum: [
        "available",
        "claimed",
        "picked",
        "delivered",
        "expired",
      ],

      default: "available",

      index: true,
    },

    /*
    ========================================
    DONOR
    ========================================
    */

    donor: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,

      index: true,
    },

    /*
    ========================================
    CLAIMED BY NGO
    ========================================
    */

    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",
    },

    /*
    ========================================
    DELIVERY VOLUNTEER
    ========================================
    */

    volunteer: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",
    },

    assignedVolunteer: {
  type:
    mongoose.Schema.Types.ObjectId,

  ref: "User",
},

    /*
    ========================================
    OPTIONAL IMAGE
    ========================================
    */

    foodImage: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

/*
========================================
COMPOUND INDEXES
========================================
*/

foodSchema.index({
  status: 1,
  location: 1,
});

foodSchema.index({
  donor: 1,
  createdAt: -1,
});

const Food = mongoose.model(
  "Food",
  foodSchema
);


export default Food;