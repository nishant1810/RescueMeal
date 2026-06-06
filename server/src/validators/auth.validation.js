import { z }
from "zod";

/*
========================================
REGISTER VALIDATION
========================================
*/

export const
registerSchema =
  z.object({

    name:
      z.string()

        .trim()

        .min(
          2,
          "Name must be at least 2 characters"
        )

        .max(
          50,
          "Name too long"
        ),

    email:
      z.string()

        .email(
          "Invalid email"
        ),

    password:
      z.string()

        .min(
          6,
          "Password must be at least 6 characters"
        ),

    role:
      z.enum([

        "donor",

        "ngo",

        "volunteer",
      ]),
  });

/*
========================================
LOGIN VALIDATION
========================================
*/

export const
loginSchema =
  z.object({

    email:
      z.string()

        .email(
          "Invalid email"
        ),

    password:
      z.string()

        .min(
          6,
          "Password must be at least 6 characters"
        ),
  });