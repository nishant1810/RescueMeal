import React from "react";

import {
  MapPin,
  Clock,
} from "lucide-react";

/*
========================================
MUTATIONS
========================================
*/

import useClaimFood
from "../../hooks/mutations/useClaimFood";

/*
========================================
UI COMPONENTS
========================================
*/

import Button
from "../ui/Button";

import StatusBadge
from "../ui/StatusBadge";

/*
========================================
UTILS
========================================
*/

import {
  calculateFoodDistance,
} from "../../utils/calculateFoodDistance";

/*
========================================
FOOD CARD
========================================
*/

const FoodCard = ({
  food,
  userLocation,
  showClaimButton = true,
}) => {

  /*
  ========================================
  CLAIM MUTATION
  ========================================
  */

  const {
    mutate: claimFoodMutation,
    isPending,
  } = useClaimFood();

  /*
  ========================================
  DISTANCE
  ========================================
  */

  const distance =
    calculateFoodDistance(

      userLocation,

      food?.coordinates?.coordinates ||

    food?.coordinates ||

    null
    );

  /*
  ========================================
  CLAIM HANDLER
  ========================================
  */

  const handleClaim = () => {

    claimFoodMutation(
      food?._id
    );
  };

  /*
  ========================================
  LOCATION NAME
  ========================================
  */

  const locationName =

  typeof food?.location === "string"

    ? food.location

    : food?.pickupAddress ||

      food?.pickupLocation ||

      food?.address ||

      food?.city ||

      "Location unavailable";

  /*
  ========================================
  EXPIRY FORMAT
  ========================================
  */

  const expiryDate =

    food?.expiryTime

      ? new Date(
          food.expiryTime
        ).toLocaleString()

      : "No expiry time";

  /*
  ========================================
  STATUS
  ========================================
  */

  const isAvailable =

    food?.status
      ?.toLowerCase() ===
    "available";

    console.log("FOOD OBJECT:", food);

console.log(
  "USER LOCATION:",
  userLocation
);

console.log(
  "FOOD LOCATION:",
  food?.location
);

  return (

    <div
      className="
        bg-white
        rounded-2xl
        border
        border-gray-100
        shadow-sm
        overflow-hidden
        transition-all
        duration-200
        hover:shadow-lg
        hover:-translate-y-1
      "
    >

      {/* ========================================
          IMAGE
      ======================================== */}

      <img
        src={
          food?.foodImage ||

          "https://placehold.co/600x400?text=Food"
        }
        alt={
          food?.foodName ||
          "Food"
        }
        className="
          w-full
          h-56
          object-cover
        "
      />

      {/* ========================================
          CONTENT
      ======================================== */}

      <div className="p-6">

        {/* HEADER */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
            mb-4
          "
        >

          <div>

            <h2
              className="
                text-2xl
                font-bold
                text-gray-900
              "
            >

              {food?.foodName}

            </h2>

            <p
              className="
                text-sm
                text-gray-500
                mt-1
              "
            >

              Quantity:
              {" "}
              {food?.quantity}

            </p>

          </div>

          <StatusBadge
            status={food?.status}
          />

        </div>

        {/* CATEGORY */}

        <p
          className="
            text-sm
            text-gray-600
            mb-3
          "
        >

          Category:
          {" "}

          <span className="font-medium">

            {food?.category}

          </span>

        </p>

        {/* LOCATION */}

        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-gray-500
            mb-3
          "
        >

          <MapPin size={16} />

          <span>

            {locationName}

          </span>

        </div>

        {/* DISTANCE */}

        {/* {distance && (

          <p
            className="
              text-sm
              text-orange-500
              font-medium
              mb-3
            "
          >

            {distance}

          </p>

        )} */}

        {/* EXPIRY */}

        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-gray-500
            mb-6
          "
        >

          <Clock size={16} />

          <span>

            {expiryDate}

          </span>

        </div>

        {/* ACTION */}

        {showClaimButton && (

          <Button
            fullWidth
            onClick={handleClaim}
            disabled={
              !isAvailable
            }
            loading={
              isPending
            }
            variant={
              isAvailable
                ? "success"
                : "secondary"
            }
          >

            {isAvailable
              ? "Claim Food"
              : "Already Claimed"}

          </Button>

        )}

      </div>

    </div>
  );
};

export default FoodCard;