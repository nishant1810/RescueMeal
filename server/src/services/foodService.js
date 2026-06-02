import axios from "axios";

/*
========================================
AXIOS INSTANCE
========================================
*/

const API = axios.create({
  baseURL:
    "http://localhost:5000/api/v1",
});

/*
========================================
ADD TOKEN AUTOMATICALLY
========================================
*/

API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(
      error
    );
  }
);

/*
========================================
DONATE FOOD
========================================
*/

export const donateFood =
  async (formData) => {
    try {
      const { data } =
        await API.post(
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
GET DASHBOARD STATS
========================================
*/

export const getDashboardStats =
  async () => {
    try {
      const { data } =
        await API.get(
          "/food/stats"
        );

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  };

/*
========================================
GET MY DONATIONS
========================================
*/

export const getMyDonations =
  async () => {
    try {
      const { data } =
        await API.get(
          "/food/my-donations"
        );

      console.log(
        "MY DONATIONS:",
        data
      );

      return (
        data?.foods || []
      );
    } catch (error) {
      console.log(error);

      return [];
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
        await API.get(
          "/food/all"
        );

      return (
        data?.foods || []
      );
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
        await API.put(
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
GET CLAIMED FOOD
========================================
*/

export const getClaimedFood =
  async () => {
    try {
      const { data } =
        await API.get(
          "/food/claimed-food"
        );

      return (
        data?.foods || []
      );
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
        await API.put(
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
        await API.put(
          `/food/mark-delivered/${id}`
        );

      return data;
    } catch (error) {
      console.log(error);

      throw error;
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
        await API.get(
          "/food/volunteer-deliveries"
        );

      return (
        data?.foods || []
      );
    } catch (error) {
      console.log(error);

      return [];
    }
  };

export default API;                     