import mongoose from "mongoose";

const foodSchema =
  new mongoose.Schema(
    {
      foodName: {
        type: String,
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },

      category: {
        type: String,
        required: true,
      },

      location: {
        type: String,
        required: true,
      },

      expiryTime: {
        type: Date,
        required: true,
      },

      description: {
        type: String,
      },

      foodImage: {
        type: String,
      },

      donor: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",

        required: true,
      },

      claimedBy: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",
      },

      volunteer: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",
      },

      status: {
        type: String,

        enum: [
          "available",
          "claimed",
          "delivered",
        ],

        default: "available",
      },
    },
    {
      timestamps: true,
    }
  );

const Food = mongoose.model(
  "Food",
  foodSchema
);

export default Food;