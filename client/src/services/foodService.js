import api from "../api/axios";

/*
========================================
DONATE FOOD
========================================
*/

export const donateFood =
  async (formData) => {
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
  };

/*
========================================
GET ALL FOOD
========================================
*/

export const getAllFood =
  async () => {
    const { data } =
      await api.get(
        "/food/all"
      );

    return data.food;
  };

/*
========================================
CLAIM FOOD
========================================
*/

export const claimFood =
  async (id) => {
    const { data } =
      await api.put(
        `/food/claim/${id}`
      );

    return data;
  };

/*
========================================
MY DONATIONS
========================================
*/

export const getMyDonations =
  async () => {
    const { data } =
      await api.get(
        "/food/my-donations"
      );

    return data.food;
  };

/*
========================================
CLAIMED FOOD
========================================
*/

export const getClaimedFood =
  async () => {
    const { data } =
      await api.get(
        "/food/claimed-food"
      );

    return data.food;
  };

/*
========================================
DASHBOARD STATS
========================================
*/

export const getDashboardStats =
  async () => {
    const { data } =
      await api.get(
        "/food/stats"
      );

    return data.stats;
  };

  /*
========================================
VOLUNTEER DELIVERIES
========================================
*/

export const getVolunteerDeliveries =
  async () => {
    const { data } =
      await api.get(
        "/food/volunteer-deliveries"
      );

    return data.food;
  };

  /*
========================================
ASSIGN DELIVERY
========================================
*/

export const assignDelivery =
  async (id) => {
    const { data } =
      await api.put(
        `/food/assign/${id}`
      );

    return data;
  };

/*
========================================
MARK DELIVERED
========================================
*/

export const markDelivered =
  async (id) => {
    const { data } =
      await api.put(
        `/food/mark-delivered/${id}`
      );

    return data;
  };