import React from "react";

/*
========================================
FOOD FILTERS
========================================
*/

const FoodFilters =
  ({

    category,

    setCategory,
  }) => {

    return (

      <div

        className="

          flex

          flex-wrap

          gap-4

          mb-6
        "
      >

        <select

          value={category}

          onChange={(e) =>

            setCategory(
              e.target.value
            )
          }

          className="

            px-4

            py-3

            rounded-xl

            border

            border-gray-200

            bg-white

            shadow-sm

            outline-none

            focus:ring-2

            focus:ring-orange-400
          "
        >

          <option value="">

            All Categories

          </option>

          <option value="veg">

            Veg

          </option>

          <option value="non-veg">

            Non-Veg

          </option>

          <option value="dessert">

            Dessert

          </option>

        </select>

      </div>
    );
  };

export default FoodFilters;