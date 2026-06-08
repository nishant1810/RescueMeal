import api from "../lib/axios";

/*
========================================
FOOD API
========================================
*/

/*
========================================
DONATE FOOD
========================================
*/

export const donateFoodApi =
  async (formData) => {

    const response =
      await api.post(

        "/food/donate",

        formData,

        {
          headers: {

            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

/*
========================================
GET ALL FOOD
========================================
*/

export const getAllFoodApi =
  async (

    page = 1,

    limit = 6
  ) => {

    const response =
      await api.get(

        "/food/all",

        {
          params: {

            page,

            limit,
          },
        }
      );

    return response.data;
  };

/*
========================================
GET MY DONATIONS
========================================
*/

export const getMyDonationsApi =
  async () => {

    const response =
      await api.get(
        "/food/my-donations"
      );

    return response.data;
  };

/*
========================================
CLAIM FOOD
========================================
*/

export const claimFoodApi =
  async (foodId) => {

    /*
    ========================================
    VALIDATION
    ========================================
    */

    if (!foodId) {

      throw new Error(
        "Food ID is required"
      );
    }

    const response =
      await api.put(

        `/food/claim/${foodId}`
      );

    return response.data;
  };

/*
========================================
GET NEARBY FOOD
========================================
*/

export const getNearbyFoodApi =
  async (

    lat,

    lng,

    distance = 10
  ) => {

    /*
    ========================================
    VALIDATION
    ========================================
    */

    if (

      lat === undefined ||

      lng === undefined

    ) {

      throw new Error(

        "Latitude and Longitude are required"
      );
    }

    const response =
      await api.get(

        "/food/nearby",

        {
          params: {

            lat,

            lng,

            distance,
          },
        }
      );

    return response.data;
  };

/*
========================================
GET DASHBOARD STATS
========================================
*/

export const getDashboardStatsApi =
  async () => {

    const response =
      await api.get(
        "/food/stats"
      );

    return response.data;
  };

/*
========================================
DELETE FOOD
========================================
*/

export const deleteFoodApi =
  async (foodId) => {

    /*
    ========================================
    VALIDATION
    ========================================
    */

    if (!foodId) {

      throw new Error(
        "Food ID is required"
      );
    }

    const response =
      await api.delete(

        `/food/${foodId}`
      );

    return response.data;
  };

/*
========================================
UPDATE FOOD
========================================
*/

export const updateFoodApi =
  async (

    foodId,

    formData
  ) => {

    /*
    ========================================
    VALIDATION
    ========================================
    */

    if (!foodId) {

      throw new Error(
        "Food ID is required"
      );
    }

    const response =
      await api.put(

        `/food/${foodId}`,

        formData,

        {
          headers: {

            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };