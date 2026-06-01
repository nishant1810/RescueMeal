import bcrypt from "bcryptjs";

import User from "../models/user.js";

import generateToken from "../utils/generateToken.js";

/*
========================================
REGISTER USER
========================================
*/

export const registerUser = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    /*
    ========================================
    VALIDATION
    ========================================
    */

    if (
      !name ||
      !email ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        success: false,

        message:
          "All fields are required",
      });
    }

    /*
    ========================================
    CHECK EXISTING USER
    ========================================
    */

    const userExists =
      await User.findOne({
        email,
      });

    if (userExists) {
      return res.status(400).json({
        success: false,

        message:
          "User already exists",
      });
    }

    /*
    ========================================
    HASH PASSWORD
    ========================================
    */

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    /*
    ========================================
    CREATE USER
    ========================================
    */

    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
        role,
      });

    /*
    ========================================
    GENERATE TOKEN
    ========================================
    */

    const token =
      generateToken(
        user._id
      );

    /*
    ========================================
    RESPONSE
    ========================================
    */

    res.status(201).json({
      success: true,

      message:
        "User registered successfully",

      token,

      user: {
        id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message:
        "Server Error",
    });
  }
};

/*
========================================
LOGIN USER
========================================
*/

export const loginUser = async (
  req,
  res
) => {
  try {
    const { email, password } =
      req.body;

    /*
    ========================================
    VALIDATION
    ========================================
    */

    if (
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Email and password are required",
      });
    }

    /*
    ========================================
    FIND USER
    ========================================
    */

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(401).json({
        success: false,

        message:
          "Invalid credentials",
      });
    }

    /*
    ========================================
    CHECK PASSWORD
    ========================================
    */

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        success: false,

        message:
          "Invalid credentials",
      });
    }

    /*
    ========================================
    GENERATE TOKEN
    ========================================
    */

    const token =
      generateToken(
        user._id
      );

    /*
    ========================================
    RESPONSE
    ========================================
    */

    res.status(200).json({
      success: true,

      message:
        "Login successful",

      token,

      user: {
        id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message:
        "Server Error",
    });
  }
};