import api from "../lib/axios";

/*
========================================
DONATE FOOD
========================================
*/

export const donateFood = async (formData) => {

  const { data } = await api.post(
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

export const getAllFood = async (
  page = 1,
  limit = 10
) => {

  const { data } = await api.get(
    `/food/all?page=${page}&limit=${limit}`
  );

  return data?.data?.foods || [];
};

/*
========================================
GET NEARBY FOOD
========================================
*/

export const getNearbyFood = async (
  lat,
  lng,
  distance = 5000
) => {

  const { data } = await api.get(
    `/food/nearby?lat=${lat}&lng=${lng}&distance=${distance}`
  );

  return data?.data?.foods || [];
};

/*
========================================
CLAIM FOOD
========================================
*/

export const claimFood = async (foodId) => {

  const { data } = await api.put(
    `/food/claim/${foodId}`
  );

  return data;
};

/*
========================================
MY DONATIONS
========================================
*/

export const getMyDonations = async () => {

  const { data } = await api.get(
    "/food/my-donations"
  );

  return data?.data?.foods || [];
};

/*
========================================
CLAIMED FOOD
========================================
*/

export const getClaimedFood = async () => {

  const { data } = await api.get(
    "/food/claimed-food"
  );

  return data?.data?.foods || [];
};

/*
========================================
DASHBOARD STATS
========================================
*/

export const getDashboardStats = async () => {

  const { data } = await api.get(
    "/food/stats"
  );

  return data?.data || {};
};

/*
========================================
VOLUNTEER DELIVERIES
========================================
*/

export const getVolunteerDeliveries = async () => {

  const { data } = await api.get(
    "/food/volunteer-deliveries"
  );

  return data?.data?.foods || [];
};

/*
========================================
MARK DELIVERED
========================================
*/

export const markDelivered = async (foodId) => {

  const { data } = await api.put(
    `/food/mark-delivered/${foodId}`
  );

  return data;
};