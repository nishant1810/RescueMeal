import React from "react";

import FoodMap
from "./FoodMap.jsx";

const FoodModal = ({
  food,
  onClose,
}) => {

  /*
  ========================================
  NO FOOD
  ========================================
  */

  if (!food) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/60
        flex
        justify-center
        items-center
        z-50
        p-4
      "
    >
      {/* ========================================
          MODAL CARD
      ======================================== */}

      <div
        className="
          bg-white
          rounded-3xl
          shadow-2xl
          max-w-4xl
          w-full
          max-h-[90vh]
          overflow-y-auto
          relative
        "
      >
        {/* ========================================
            CLOSE BUTTON
        ======================================== */}

        <button
          onClick={onClose}

          className="
            absolute
            top-4
            right-4
            bg-red-500
            hover:bg-red-600
            text-white
            w-10
            h-10
            rounded-full
            text-xl
            z-10
          "
        >
          ×
        </button>

        {/* ========================================
            FOOD IMAGE
        ======================================== */}

        <img
          src={
            food.foodImage ||
            `${BASE_URL}/${food.foodImage.replace(/^\/+/, "")}`
          }

          alt={food.foodName}

          className="
            w-full
            h-72
            object-cover
          "
        />

        {/* ========================================
            CONTENT
        ======================================== */}

        <div
          className="
            p-8
          "
        >
          {/* FOOD NAME */}

          <h1
            className="
              text-4xl
              font-bold
              mb-6
            "
          >
            {food.foodName}
          </h1>

          {/* DETAILS */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-6
              mb-8
            "
          >
            <div>
              <h3
                className="
                  font-semibold
                  text-lg
                "
              >
                Quantity
              </h3>

              <p>
                {food.quantity}
              </p>
            </div>

            <div>
              <h3
                className="
                  font-semibold
                  text-lg
                "
              >
                Category
              </h3>

              <p>
                {food.category}
              </p>
            </div>

            <div>
              <h3
                className="
                  font-semibold
                  text-lg
                "
              >
                Location
              </h3>

              <p>
                {food.location}
              </p>
            </div>

            <div>
              <h3
                className="
                  font-semibold
                  text-lg
                "
              >
                Status
              </h3>

              <p
                className="
                  capitalize
                "
              >
                {food.status}
              </p>
            </div>
          </div>

          {/* DESCRIPTION */}

          <div
            className="
              mb-8
            "
          >
            <h3
              className="
                font-semibold
                text-lg
                mb-2
              "
            >
              Description
            </h3>

            <p
              className="
                text-gray-700
              "
            >
              {
                food.description ||
                "No description available"
              }
            </p>
          </div>

          {/* ========================================
              MAP
          ======================================== */}

          {food.coordinates?.lat &&
            food.coordinates?.lng && (

            <div>
              <h3
                className="
                  font-semibold
                  text-lg
                  mb-4
                "
              >
                Pickup Location
              </h3>

              <FoodMap
                lat={
                  food.coordinates.lat
                }

                lng={
                  food.coordinates.lng
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodModal;