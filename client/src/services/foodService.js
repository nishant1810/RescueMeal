import api from "../api/axios";

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
      console.log(error);

      throw error;
    }
  };

/*
========================================
GET ALL FOOD
========================================
*/

export const getAllFood =
  async () => {
    try {
      const { data } =
        await api.get(
          "/food/all"
        );

      /*
      Backend returns:
      {
        success: true,
        foods: []
      }
      */

      return data.foods || [];
    } catch (error) {
      console.log(error);

      return [];
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
      console.log(error);

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

      console.log(
        "MY DONATIONS:",
        data
      );

      /*
      IMPORTANT FIX
      */

      return data.foods || [];
    } catch (error) {
      console.log(error);

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

      return data.foods || [];
    } catch (error) {
      console.log(error);

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

      /*
      SAFE STATS
      */

      return (
        data.stats || {
          totalFood: 0,
          availableFood: 0,
          claimedFood: 0,
          deliveredFood: 0,
        }
      );
    } catch (error) {
      console.log(error);

      return {
        totalFood: 0,
        availableFood: 0,
        claimedFood: 0,
        deliveredFood: 0,
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

      return data.foods || [];
    } catch (error) {
      console.log(error);

      return [];
    }
  };

/*
========================================
ASSIGN DELIVERY
========================================
*/

export const assignDelivery =
  async (
    foodId,
    volunteerId
  ) => {
    try {
      const { data } =
        await api.put(
          `/food/assign/${foodId}`,
          {
            volunteerId,
          }
        );

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  };

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
      console.log(error);

      throw error;
    }
  };