import { z } from "zod";

export const foodDonationSchema =
  z.object({
    body: z.object({
      foodName: z
        .string()
        .min(2, "Food name is required"),

      quantity: z
        .number()
        .positive(
          "Quantity must be positive"
        ),

      location: z
        .string()
        .min(3, "Location is required"),

      expiryTime: z.string(),

      description: z
        .string()
        .optional(),
    }),
  });