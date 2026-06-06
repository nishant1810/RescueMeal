import React
from "react";

/*
========================================
LOADER
========================================
*/

const Loader =
  () => {

    return (

      <div

        className="

          flex

          items-center

          justify-center

          py-10
        "
      >

        <div

          className="

            h-12

            w-12

            border-4

            border-orange-500

            border-t-transparent

            rounded-full

            animate-spin
          "
        />

      </div>
    );
  };

export default
Loader;