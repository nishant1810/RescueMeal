import api from "../lib/axios";

/*
========================================
GET ADMIN STATS
========================================
*/

export const getAdminStats =
  async () => {

    try {

      const { data } =
        await api.get(
          "/admin/stats"
        );

      /*
      ========================================
      SAFE RESPONSE
      ========================================
      */

      return {

        totalUsers:
          data?.totalUsers || 0,

        totalFood:
          data?.totalFood || 0,

        totalDeliveries:
          data?.totalDeliveries || 0,

        totalNGOs:
          data?.totalNGOs || 0,
      };

    } catch (error) {

      console.log(
        "ADMIN STATS ERROR:",
        error
      );

      return {

        totalUsers: 0,

        totalFood: 0,

        totalDeliveries: 0,

        totalNGOs: 0,
      };
    }
  };

/*
========================================
GET USERS
========================================
*/

export const getUsers =
  async () => {

    try {

      const { data } =
        await api.get(
          "/admin/users"
        );

      return (
        data?.users || []
      );

    } catch (error) {

      console.log(
        "GET USERS ERROR:",
        error
      );

      return [];
    }
  };

/*
========================================
DELETE USER
========================================
*/

export const deleteUser =
  async (userId) => {

    try {

      const { data } =
        await api.delete(

          `/admin/users/${userId}`
        );

      return data;

    } catch (error) {

      console.log(
        "DELETE USER ERROR:",
        error
      );

      throw error;
    }
  };