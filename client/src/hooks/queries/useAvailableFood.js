import {
  useQuery,
} from "@tanstack/react-query";

/*
========================================
SERVICES
========================================
*/

import {
  getAllFood,
  getNearbyFood,
} from "../../services/food.service";

/*
========================================
USE AVAILABLE FOOD
========================================
*/

const useAvailableFood = (
  page,
  userLocation
) => {

  return useQuery({

    queryKey: [
      "available-food",
      page,
      userLocation,
    ],

    queryFn: async () => {

      /*
      ========================================
      NEARBY FOOD
      ========================================
      */

      if (
        userLocation?.lat &&
        userLocation?.lng
      ) {

        console.log(
          "FETCHING NEARBY FOOD..."
        );

        const nearbyFoods =
          await getNearbyFood(

            userLocation.lat,
            userLocation.lng
          );

        console.log(
          "NEARBY FOODS:",
          nearbyFoods
        );

        return nearbyFoods;
      }

      /*
      ========================================
      ALL FOOD
      ========================================
      */

      console.log(
        "FETCHING ALL FOOD..."
      );

      const allFoods =
        await getAllFood(
          page,
          6
        );

      console.log(
        "ALL FOODS:",
        allFoods
      );

      return allFoods;
    },

    staleTime:
      1000 * 60 * 5,
  });
};

export default useAvailableFood;