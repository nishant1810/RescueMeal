import api
from "./axios";

/*
========================================
DONATE FOOD
========================================
*/

export const
donateFood =
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

export const
getAllFood =
  async (
    page = 1
  ) => {

    const response =
      await api.get(

        `/food/all?page=${page}`
      );

    return response.data;
  };

/*
========================================
GET MY DONATIONS
========================================
*/

export const
getMyDonations =
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

export const
claimFood =
  async (foodId) => {

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

export const
getNearbyFood =
  async (
    lat,
    lng
  ) => {

    const response =
      await api.get(

        `/food/nearby?lat=${lat}&lng=${lng}`
      );

    return response.data;
  };

/*
========================================
GET DASHBOARD STATS
========================================
*/

export const
getDashboardStats =
  async () => {

    const response =
      await api.get(
        "/food/stats"
      );

    return response.data;
  };