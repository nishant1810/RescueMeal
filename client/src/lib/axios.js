import axios from "axios";

import toast from "react-hot-toast";

/*
========================================
AXIOS INSTANCE
========================================
*/

const api = axios.create({

  /*
  ========================================
  BASE URL
  ========================================
  */

  baseURL:

    import.meta.env
      .VITE_API_URL ||

    "http://localhost:5000/api/v1",

  /*
  ========================================
  REQUEST TIMEOUT
  ========================================
  */

  timeout: 10000,

  /*
  ========================================
  SEND COOKIES
  ========================================
  */

  withCredentials: true,

  /*
  ========================================
  DEFAULT HEADERS
  ========================================
  */

  headers: {

    "Content-Type":
      "application/json",
  },
});

/*
========================================
REQUEST INTERCEPTOR
========================================
*/

api.interceptors.request.use(

  (config) => {

    /*
    ========================================
    GET TOKEN
    ========================================
    */

    const token =
      localStorage.getItem(
        "token"
      );

    /*
    ========================================
    ATTACH TOKEN
    ========================================
    */

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
RESPONSE INTERCEPTOR
========================================
*/

api.interceptors.response.use(

  (response) =>
    response,

  (error) => {

    /*
    ========================================
    NETWORK ERROR
    ========================================
    */

    if (!error.response) {

      toast.error(
        "Network Error"
      );

      return Promise.reject(
        error
      );
    }

    /*
    ========================================
    STATUS
    ========================================
    */

    const status =
      error.response.status;

    /*
    ========================================
    UNAUTHORIZED
    ========================================
    */

    if (status === 401) {

      /*
      ========================================
      CLEAR STORAGE
      ========================================
      */

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      /*
      ========================================
      SESSION EXPIRED
      ========================================
      */

      toast.error(
        "Session expired. Please login again."
      );

      /*
      ========================================
      REDIRECT LOGIN
      ========================================
      */

      if (

        window.location.pathname !==
        "/login"

      ) {

        window.location.href =
          "/login";
      }
    }

    /*
    ========================================
    FORBIDDEN
    ========================================
    */

    if (status === 403) {

      toast.error(
        "Access denied"
      );
    }

    /*
    ========================================
    IMPORTANT
    REMOVE GLOBAL SERVER TOASTS
    ========================================
    */

    /*
    DO NOT SHOW:
    - Internal server error
    - Backend custom errors

    Mutation hooks will handle them.
    */

    return Promise.reject(
      error
    );
  }
);

export default api;