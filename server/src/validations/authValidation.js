import { z } from "zod";

/*
========================================
REGISTER VALIDATION
========================================
*/

export const registerSchema =
  z.object({
    body: z.object({
      name: z
        .string()
        .min(3, "Name is too short"),

      email: z
        .string()
        .email("Invalid email"),

      password: z
        .string()
        .min(
          6,
          "Password must be at least 6 characters"
        ),

      role: z.enum([
        "donor",
        "ngo",
        "volunteer",
        "admin",
      ]),
    }),
  });

/*
========================================
LOGIN VALIDATION
========================================
*/

export const loginSchema =
  z.object({
    body: z.object({
      email: z
        .string()
        .email("Invalid email"),

      password: z
        .string()
        .min(
          6,
          "Password is required"
        ),
    }),
  });