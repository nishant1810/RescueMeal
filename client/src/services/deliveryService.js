import api
from "../lib/axios";

/*
========================================
GET AVAILABLE DELIVERIES
========================================
*/

export const
getAvailableDeliveries =
  async () => {

    try {

      const { data } =
        await api.get(
          "/delivery"
        );

      /*
      ========================================
      SAFE RESPONSE
      ========================================
      */

      return (
        data?.deliveries || []
      );

    } catch (error) {

      console.log(
        "GET DELIVERIES ERROR:",
        error
      );

      return [];
    }
  };

/*
========================================
ACCEPT DELIVERY
========================================
*/

export const
acceptDelivery =
  async (id) => {

    try {

      const { data } =
        await api.patch(
          `/delivery/accept/${id}`
        );

      return data;

    } catch (error) {

      console.log(
        "ACCEPT DELIVERY ERROR:",
        error
      );

      throw error;
    }
  };

/*
========================================
MARK PICKED
========================================
*/

export const
markPicked =
  async (id) => {

    try {

      const { data } =
        await api.patch(
          `/delivery/pick/${id}`
        );

      return data;

    } catch (error) {

      console.log(
        "MARK PICKED ERROR:",
        error
      );

      throw error;
    }
  };

/*
========================================
MARK DELIVERED
========================================
*/

export const
markDelivered =
  async (id) => {

    try {

      const { data } =
        await api.patch(
          `/delivery/deliver/${id}`
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

/*
========================================
VOLUNTEER HISTORY
========================================
*/

export const
getVolunteerHistory =
  async () => {

    try {

      const { data } =
        await api.get(
          "/delivery/history"
        );

      /*
      ========================================
      SAFE RESPONSE
      ========================================
      */

      return (
        data?.deliveries || []
      );

    } catch (error) {

      console.log(
        "VOLUNTEER HISTORY ERROR:",
        error
      );

      return [];
    }
  };