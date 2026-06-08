import {
  useEffect,
  useState,
} from "react";

/*
========================================
USER LOCATION HOOK
========================================
*/

const useUserLocation = () => {

  const [
    location,
    setLocation,
  ] = useState(null);

  useEffect(() => {

    /*
    ========================================
    GEOLOCATION SUPPORT
    ========================================
    */

    if (
      !navigator.geolocation
    ) {

      console.error(
        "Geolocation not supported"
      );

      return;
    }

    /*
    ========================================
    GET USER LOCATION
    ========================================
    */

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const userCoords = {

          lat:
            position.coords.latitude,

          lng:
            position.coords.longitude,
        };

        console.log(
          "USER LOCATION:",
          userCoords
        );

        setLocation(
          userCoords
        );
      },

      (error) => {

        console.error(
          "Location Error:",
          error
        );

        /*
        ========================================
        FALLBACK LOCATION
        GREATER NOIDA
        ========================================
        */

        setLocation({

          lat: 28.4744,

          lng: 77.5040,
        });
      },

      {
        enableHighAccuracy: false,

        timeout: 30000,

        maximumAge: 600000,
      }
    );

  }, []);

  return {
    location,
  };
};

export default useUserLocation;