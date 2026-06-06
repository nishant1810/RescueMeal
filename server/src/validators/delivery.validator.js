import { z }
from "zod";

export const deliverySchema =
  z.object({

    pickupAddress:
      z.string()

        .min(
          3,
          "Pickup address required"
        ),

    deliveryAddress:
      z.string()

        .min(
          3,
          "Delivery address required"
        ),
  });