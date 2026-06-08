import {
  getDistance,
} from "geolib";

/*
========================================
CALCULATE FOOD DISTANCE
========================================
*/

export const calculateFoodDistance = (
  userLocation,
  coordinates
) => {

  try {

    if (
      !userLocation ||
      !coordinates ||
      !Array.isArray(coordinates)
    ) {

      return null;
    }

    /*
    ========================================
    MONGODB FORMAT
    [lng, lat]
    ========================================
    */

    const foodLng =
      Number(coordinates[0]);

    const foodLat =
      Number(coordinates[1]);

    if (
      Number.isNaN(foodLat) ||
      Number.isNaN(foodLng)
    ) {

      return null;
    }

    /*
    ========================================
    DISTANCE
    ========================================
    */

    const meters =
      getDistance(

        {
          latitude:
            Number(userLocation.lat),

          longitude:
            Number(userLocation.lng),
        },

        {
          latitude: foodLat,
          longitude: foodLng,
        }
      );

    /*
    ========================================
    KM
    ========================================
    */

    const km =
      meters / 1000;

    return `${km.toFixed(1)} km away`;

  } catch (error) {

    console.error(
      "Distance Error:",
      error
    );

    return null;
  }
};