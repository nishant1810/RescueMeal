import api
from "../api/axios";

/*
========================================
DONATE FOOD
========================================
*/

export const donateFood =
  async (formData) => {

    try {

      const { data } =
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

      return data;

    } catch (error) {

      console.log(
        "DONATE FOOD ERROR:",
        error
      );

      throw error;
    }
  };

/*
========================================
GET ALL FOOD
========================================
*/

export const getAllFood =
  async (
    page = 1,
    limit = 6
  ) => {

    try {

      const { data } =
        await api.get(

          `/food/all?page=${page}&limit=${limit}`
        );

      /*
      ========================================
      SAFE RESPONSE
      ========================================
      */

      return {
        foods:
          data?.foods || [],

        currentPage:
          data?.currentPage || 1,

        totalPages:
          data?.totalPages || 1,

        totalFoods:
          data?.totalFoods || 0,
      };

    } catch (error) {

      console.log(
        "GET ALL FOOD ERROR:",
        error
      );

      return {
        foods: [],

        currentPage: 1,

        totalPages: 1,

        totalFoods: 0,
      };
    }
  };

/*
========================================
GET NEARBY FOOD
========================================
*/

export const getNearbyFood =
  async (
    lat,
    lng,
    distance = 5000
  ) => {

    try {

      const { data } =
        await api.get(

          `/food/nearby?lat=${lat}&lng=${lng}&distance=${distance}`
        );

      /*
      ========================================
      SAFE RESPONSE
      ========================================
      */

      return {
        foods:
          data?.foods || [],

        count:
          data?.count || 0,
      };

    } catch (error) {

      console.log(
        "GET NEARBY FOOD ERROR:",
        error
      );

      return {
        foods: [],

        count: 0,
      };
    }
  };

/*
========================================
CLAIM FOOD
========================================
*/

export const claimFood =
  async (id) => {

    try {

      const { data } =
        await api.put(
          `/food/claim/${id}`
        );

      return data;

    } catch (error) {

      console.log(
        "CLAIM FOOD ERROR:",
        error
      );

      throw error;
    }
  };

/*
========================================
MY DONATIONS
========================================
*/

export const getMyDonations =
  async () => {

    try {

      const { data } =
        await api.get(
          "/food/my-donations"
        );

      return (
        data?.foods || []
      );

    } catch (error) {

      console.log(
        "MY DONATIONS ERROR:",
        error
      );

      return [];
    }
  };

/*
========================================
CLAIMED FOOD
========================================
*/

export const getClaimedFood =
  async () => {

    try {

      const { data } =
        await api.get(
          "/food/claimed-food"
        );

      return (
        data?.foods || []
      );

    } catch (error) {

      console.log(
        "CLAIMED FOOD ERROR:",
        error
      );

      return [];
    }
  };

/*
========================================
DASHBOARD STATS
========================================
*/

export const getDashboardStats =
  async () => {

    try {

      const { data } =
        await api.get(
          "/food/stats"
        );

      return (
        data?.stats || {

          totalDonations: 0,

          availableFood: 0,

          claimedFood: 0,

          deliveredFood: 0,

          pickedDeliveries: 0,
        }
      );

    } catch (error) {

      console.log(
        "DASHBOARD STATS ERROR:",
        error
      );

      return {

        totalDonations: 0,

        availableFood: 0,

        claimedFood: 0,

        deliveredFood: 0,

        pickedDeliveries: 0,
      };
    }
  };

/*
========================================
VOLUNTEER DELIVERIES
========================================
*/

export const getVolunteerDeliveries =
  async () => {

    try {

      const { data } =
        await api.get(
          "/food/volunteer-deliveries"
        );

      return (
        data?.foods || []
      );

    } catch (error) {

      console.log(
        "VOLUNTEER DELIVERIES ERROR:",
        error
      );

      return [];
    }
  };

/*
========================================
ASSIGN DELIVERY
========================================
*/

// export const assignDelivery =
//   async (
//     foodId,
//     volunteerId
//   ) => {

//     try {

//       const { data } =
//         await api.put(

//           `/food/assign/${foodId}`,

//           {
//             volunteerId,
//           }
//         );

//       return data;

//     } catch (error) {

//       console.log(
//         "ASSIGN DELIVERY ERROR:",
//         error
//       );

//       throw error;
//     }
//   };

/*
========================================
MARK DELIVERED
========================================
*/

export const markDelivered =
  async (id) => {

    try {

      const { data } =
        await api.put(
          `/food/mark-delivered/${id}`
        );

      return data;

    } catch (error) {

      console.log(
        "MARK DELIVERED ERROR:",
        error
      );

      throw error;
    }
  };