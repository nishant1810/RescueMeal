import bcrypt from "bcryptjs";

import User
from "../models/User.js";

import generateToken
from "../utils/generateToken.js";

import { ROLES }
from "../constants/roles.js";

import { MESSAGES }
from "../constants/messages.js";

/*
========================================
REGISTER USER
========================================
*/

export const registerUser =
  async (
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

        return res
          .status(400)
          .json({

            success: false,

            message:
              "All fields are required",
          });
      }

      /*
      ========================================
      VALIDATE ROLE
      ========================================
      */

      if (

        !Object.values(
          ROLES
        ).includes(role)

      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              "Invalid role selected",
          });
      }

      /*
      ========================================
      CHECK EXISTING USER
      ========================================
      */

      const existingUser =
        await User.findOne({

          email:
            email.toLowerCase(),
        });

      if (
        existingUser
      ) {

        return res
          .status(400)
          .json({

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
          12
        );

      /*
      ========================================
      CREATE USER
      ========================================
      */

      const user =
        await User.create({

          name:
            name.trim(),

          email:
            email.toLowerCase(),

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

      return res
        .status(201)
        .json({

          success: true,

          message:
            MESSAGES.AUTH
              .REGISTER_SUCCESS,

          token,

          user: {

            id:
              user._id,

            name:
              user.name,

            email:
              user.email,

            role:
              user.role,
          },
        });

    } catch (error) {

      console.log(
        "REGISTER ERROR:",
        error
      );

      return res
        .status(500)
        .json({

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

export const loginUser =
  async (
    req,
    res
  ) => {

    try {

      const {

        email,

        password,

      } = req.body;

      /*
      ========================================
      VALIDATION
      ========================================
      */

      if (

        !email ||

        !password

      ) {

        return res
          .status(400)
          .json({

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

          email:
            email.toLowerCase(),
        });

      /*
      ========================================
      INVALID USER
      ========================================
      */

      if (!user) {

        return res
          .status(401)
          .json({

            success: false,

            message:
              MESSAGES.AUTH
                .INVALID_CREDENTIALS,
          });
      }

      /*
      ========================================
      CHECK PASSWORD
      ========================================
      */

      const isPasswordMatched =
        await bcrypt.compare(

          password,

          user.password
        );

      /*
      ========================================
      INVALID PASSWORD
      ========================================
      */

      if (
        !isPasswordMatched
      ) {

        return res
          .status(401)
          .json({

            success: false,

            message:
              MESSAGES.AUTH
                .INVALID_CREDENTIALS,
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

      return res
        .status(200)
        .json({

          success: true,

          message:
            MESSAGES.AUTH
              .LOGIN_SUCCESS,

          token,

          user: {

            id:
              user._id,

            name:
              user.name,

            email:
              user.email,

            role:
              user.role,
          },
        });

    } catch (error) {

      console.log(
        "LOGIN ERROR:",
        error
      );

      return res
        .status(500)
        .json({

          success: false,

          message:
            "Server Error",
        });
    }
  };