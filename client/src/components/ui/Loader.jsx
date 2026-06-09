import React from "react";

/*
========================================
LOADER
========================================
*/

const Loader =
  ({

    fullScreen = false,

    size = "md",

    text = "",
  }) => {

    /*
    ========================================
    SIZE STYLES
    ========================================
    */

    const sizes = {

      sm: `
        h-8
        w-8
        border-2
      `,

      md: `
        h-12
        w-12
        border-4
      `,

      lg: `
        h-16
        w-16
        border-4
      `,
    };

    return (

      <div

        className={`

          flex

          flex-col

          items-center

          justify-center

          gap-4

          ${
            fullScreen
              ? "min-h-screen"
              : "py-10"
          }
        `}
      >

        {/* ========================================
            SPINNER
        ======================================== */}

        <div

          className={`

            rounded-full

            border-orange-500

            border-t-transparent

            animate-spin

            ${sizes[size]}
          `}
        />

        {/* ========================================
            LOADING TEXT
        ======================================== */}

        {text && (

          <p

            className="

              text-gray-500

              text-sm

              font-medium
            "
          >

            {text}

          </p>
        )}

      </div>
    );
  };

export default Loader;