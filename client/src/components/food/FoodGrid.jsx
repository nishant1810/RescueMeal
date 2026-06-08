import React from "react";

/*
========================================
FOOD CARD
========================================
*/

import FoodCard
from "./FoodCard";

/*
========================================
FOOD GRID
========================================
*/

const FoodGrid =
  ({

    foods,

    userLocation,
  }) => {

    return (

      <div

        className="

          grid

          grid-cols-1

          md:grid-cols-2

          xl:grid-cols-3

          gap-8
        "
      >

        {foods.map(
          (food) => (

            <FoodCard

              key={food._id}

              food={food}

              userLocation={
                userLocation
              }
            />
          )
        )}

      </div>
    );
  };

export default FoodGrid;