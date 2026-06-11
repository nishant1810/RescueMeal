import axios from "axios";

import toast from "react-hot-toast";

/*
========================================
AXIOS INSTANCE
========================================
*/

console.log("API URL =", import.meta.env.VITE_API_URL);

const api = axios.create({

  /*
  ========================================
  BASE URL
  ========================================
  */

  baseURL:
    import.meta.env
      .VITE_API_URL,

  /*
  ========================================
  REQUEST TIMEOUT
  ========================================
  */

  timeout: 10000,

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

    const token =
      localStorage.getItem(
        "token"
      );

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

  (response) => response,

  (error) => {

    /*
    ========================================
    NETWORK ERROR
    ========================================
    */

    if (!error.response) {

      toast.error(
        "Unable to connect to server"
      );

      return Promise.reject(
        error
      );
    }

    const status =
      error.response.status;

    /*
    ========================================
    UNAUTHORIZED
    ========================================
    */

    if (status === 401) {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      if (

        window.location.pathname !==
        "/login"

      ) {

        toast.error(
          "Session expired. Please login again."
        );

        window.location.href =
          "/login";
      }
    }

    /*
    ========================================
    FORBIDDEN
    ========================================
    */

    else if (status === 403) {

      toast.error(
        "Access denied"
      );
    }

    /*
    ========================================
    SERVER ERROR
    ========================================
    */

    else if (status >= 500) {

      console.error(
        "Server Error:",
        error.response.data
      );
    }

    return Promise.reject(
      error
    );
  }
);

export default api;