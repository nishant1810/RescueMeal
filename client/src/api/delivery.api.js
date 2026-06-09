import lib from "../lib/axios.js";

/*
========================================
GET VOLUNTEER DELIVERIES
========================================
*/

export const
getVolunteerDeliveries =
  async () => {

    const response =
      await api.get(

        "/food/volunteer-deliveries"
      );

    return response.data;
  };

/*
========================================
MARK DELIVERED
========================================
*/

export const
markDelivered =
  async (foodId) => {

    const response =
      await api.put(

        `/food/mark-delivered/${foodId}`
      );

    return response.data;
  };