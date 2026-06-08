/*
========================================
GET IMAGE URL
========================================
*/

export const getImageUrl =
  (imagePath) => {

    const BASE_URL =

      import.meta.env
        .VITE_API_URL ||

      "http://localhost:5000";

    /*
    ========================================
    NO IMAGE
    ========================================
    */

    if (!imagePath) {

      return "https://placehold.co/300x300?text=Food";
    }

    /*
    ========================================
    FULL URL
    ========================================
    */

    if (
      imagePath.startsWith(
        "http"
      )
    ) {

      return imagePath;
    }

    /*
    ========================================
    LOCAL IMAGE
    ========================================
    */

    return `${BASE_URL}/${imagePath.replace(/^\/+/, "")}`;
  };