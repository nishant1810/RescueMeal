import React from "react";

/*
========================================
CARD
========================================
*/

const Card =
  ({

    children,

    className = "",

    padding = "md",

    hover = false,
  }) => {

    /*
    ========================================
    PADDING STYLES
    ========================================
    */

    const paddings = {

      sm: "p-4",

      md: "p-6",

      lg: "p-8",
    };

    return (

      <div

        className={`

          bg-white

          rounded-3xl

          border

          border-gray-100

          shadow-sm

          transition-all

          duration-300

          ${paddings[padding]}

          ${

            hover

              ? `
                hover:shadow-xl
                hover:-translate-y-1
              `

              : ""
          }

          ${className}
        `}
      >

        {children}

      </div>
    );
  };

export default Card;