import api
from "./axios";

/*
========================================
REGISTER USER
========================================
*/

export const
registerUser =
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

export const
loginUser =
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
GET PROFILE
========================================
*/

export const
getProfile =
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

export const
logoutUser =
  async () => {

    const response =
      await api.post(
        "/auth/logout"
      );

    return response.data;
  };