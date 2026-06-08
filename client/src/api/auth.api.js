import api from "../lib/axios";

/*
========================================
AUTH API
========================================
*/

/*
========================================
REGISTER USER
========================================
*/

export const registerUserApi =
  async (userData) => {

    const response =
      await api.post(

        "/auth/register",

        userData
      );

    return response.data;
  };

/*
========================================
LOGIN USER
========================================
*/

export const loginUserApi =
  async (userData) => {

    const response =
      await api.post(

        "/auth/login",

        userData
      );

    return response.data;
  };

/*
========================================
GET USER PROFILE
========================================
*/

export const getProfileApi =
  async () => {

    const response =
      await api.get(
        "/users/profile"
      );

    return response.data;
  };

/*
========================================
LOGOUT USER
========================================
*/

export const logoutUserApi =
  async () => {

    const response =
      await api.post(
        "/auth/logout"
      );

    return response.data;
  };