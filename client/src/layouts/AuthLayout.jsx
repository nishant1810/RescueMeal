import React
from "react";

/*
========================================
AUTH LAYOUT
========================================
*/

const AuthLayout =
  ({ children }) => {

    return (

      <div

        className="

          min-h-screen

          flex

          items-center

          justify-center

          bg-gradient-to-br

          from-orange-100

          via-white

          to-blue-100

          px-4
        "
      >

        <div

          className="

            w-full

            max-w-md
          "
        >

          {children}

        </div>

      </div>
    );
  };

export default
AuthLayout;