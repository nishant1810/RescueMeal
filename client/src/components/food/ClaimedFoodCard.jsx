import React from "react";

/*
========================================
CLAIMED FOOD CARD
========================================
*/

const ClaimedFoodCard =
  ({ food }) => {

    return (

      <div

        className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
          border
        "
      >

        {/* FOOD IMAGE */}

        <img
          src={
            food?.foodImage ||
            "https://placehold.co/600x400?text=Food"
          }
          alt={food?.foodName}
          className="
            w-full
            h-52
            object-cover
            rounded-xl
            mb-4
          "
        />

        {/* FOOD NAME */}

        <h2

          className="
            text-2xl
            font-bold
            mb-3
          "
        >

          {food?.foodName}

        </h2>

        {/* FOOD DETAILS */}

        <div
          className="
            space-y-2
            text-gray-600
          "
        >

          <p>
            Quantity:
            {" "}
            {food?.quantity}
          </p>

          <p>
            Category:
            {" "}
            {food?.category}
          </p>

          <p>
            Location:
            {" "}
            {food?.location}
          </p>

          <p>
            Status:
            {" "}

            <span
              className="
                text-orange-500
                font-semibold
              "
            >

              {food?.status}

            </span>

          </p>

        </div>

      </div>
    );
  };

export default ClaimedFoodCard;