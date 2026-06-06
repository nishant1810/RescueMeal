import mongoose from "mongoose";
import { ROLES } from "../constants/roles.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,

      unique: true,

      lowercase: true,

      trim: true,

      index: true,
    },

    password: {
      type: String,
      required: true,

      minlength: 6,
    },

    role: {
      type: String,

      enum:
      Object.values(
        ROLES
      ),

      default: "donor",

      index: true,
    },

    phone: {
      type: String,
    },

    address: {
      type: String,
    },

    organizationName: {
      type: String,
    },

    profileImage: {
      type: String,
    },

    isVerified: {
      type: Boolean,

      default: false,
    },
  },

  {
    timestamps: true,
  }
);

const User =
  mongoose.models.User ||

  mongoose.model(
    "User",
    userSchema
  );

export default User;