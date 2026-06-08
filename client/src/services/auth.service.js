import api
from "../lib/axios";

/*
========================================
REGISTER USER
========================================
*/

export const registerUser =
  async (userData) => {

    const { data } =
      await api.post(

        "/auth/register",

        userData
      );

    return data;
  };

/*
========================================
LOGIN USER
========================================
*/

export const loginUser =
  async (userData) => {

    const { data } =
      await api.post(

        "/auth/login",

        userData
      );

    return data;
  };

/*
========================================
GET PROFILE
========================================
*/

export const getProfile =
  async () => {

    const { data } =
      await api.get(
        "/auth/profile"
      );

    return data;
  };

/*
========================================
LOGOUT
========================================
*/

export const logoutUser =
  async () => {

    const { data } =
      await api.post(
        "/auth/logout"
      );

    return data;
  };