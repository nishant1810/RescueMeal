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
      .VITE_API_URL,

  /*
  ========================================
  DEFAULT HEADERS
  ========================================
  */

  headers: {
    "Content-Type":
      "application/json",
  },

  /*
  ========================================
  SEND COOKIES
  ========================================
  */

  withCredentials: true,
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
    ADD TOKEN
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
    SERVER RESPONSE ERROR
    ========================================
    */

    if (
      error.response
    ) {
      const message =
        error.response.data
          ?.message ||
        "Something went wrong";

      /*
      ========================================
      TOKEN EXPIRED
      ========================================
      */

      if (
        error.response
          .status ===
        401
      ) {
        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        toast.error(
          "Session expired. Please login again."
        );

        /*
        ========================================
        REDIRECT LOGIN
        ========================================
        */

        window.location.href =
          "/login";
      } else {
        toast.error(
          message
        );
      }
    }

    /*
    ========================================
    NETWORK ERROR
    ========================================
    */

    else if (
      error.request
    ) {
      toast.error(
        "Network Error. Please check your connection."
      );
    }

    /*
    ========================================
    UNKNOWN ERROR
    ========================================
    */

    else {
      toast.error(
        "Unexpected Error"
      );
    }

    return Promise.reject(
      error
    );
  }
);

export default api;