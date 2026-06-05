import React from "react";

import toast from "react-hot-toast";
import {getDistance,}from "geolib";
import {claimFood,} from "../services/foodService";

const FoodCard = ({
  food,
  refreshFood,
  userLocation,
}) => {
  const handleClaim =
    async () => {
      try {
        await claimFood(
          food._id
        );

        toast.success(
          "Food Claimed"
        );

        refreshFood();
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Error claiming food"
        );
      }
    };

    /*
========================================
DISTANCE
========================================
*/

let distance =
  null;

if (
  userLocation?.lat &&
  userLocation?.lng &&
  food?.coordinates?.coordinates
) {

  /*
  ========================================
  MONGODB GEO FORMAT
  [lng, lat]
  ========================================
  */

  const [
    foodLng,
    foodLat,
  ] =
    food.coordinates.coordinates;

  /*
  ========================================
  DISTANCE IN METERS
  ========================================
  */

  const distanceMeters =
    getDistance(

      {
        latitude:
          userLocation.lat,

        longitude:
          userLocation.lng,
      },

      {
        latitude:
          foodLat,

        longitude:
          foodLng,
      }
    );

  /*
  ========================================
  KM FORMAT
  ========================================
  */

  distance =
    (
      distanceMeters / 1000
    ).toFixed(1);
}

  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-lg
      overflow-hidden
    "
    >
      <img
        src={
  food.foodImage ||
  "https://placehold.co/600x400?text=Food"
}
        alt={food.foodName}
        className="
        w-full
        h-56
        object-cover
      "
      />

      <div className="p-6">
        <h2
          className="
          text-2xl
          font-bold
          mb-4
        "
        >
          {food.foodName}
        </h2>

        <div
          className="
          space-y-2
          text-gray-700
        "
        >
          <p>
            Quantity:
            {" "}
            {food.quantity}
          </p>

          <p>
            Category:
            {" "}
            {food.category}
          </p>

          <p>
            Location:
            {" "}
            {food.location}
          </p>

          <p>
            Status:
            {" "}
            <span
              className={
                food.status ===
                "available"
                  ? "text-green-600 font-bold"
                  : "text-orange-500 font-bold"
              }
            >
              {food.status}
            </span>
          </p>
        </div>

        <button
          onClick={
            handleClaim
          }
          disabled={
            food.status !==
            "available"
          }
          className={`
            mt-6
            w-full
            py-3
            rounded-lg
            font-semibold
            text-white
            ${
              food.status ===
              "available"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-400 cursor-not-allowed"
            }
          `}
        >
          {food.status ===
          "available"
            ? "Claim Food"
            : "Already Claimed"}
        </button>
      </div>
    </div>
  );
};

export default FoodCard;