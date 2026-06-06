import React
from "react";

/*
========================================
BUTTON
========================================
*/

const Button =
  ({
    children,

    type = "button",

    variant = "primary",

    loading = false,

    disabled = false,

    className = "",

    ...props
  }) => {

    /*
    ========================================
    VARIANTS
    ========================================
    */

    const variants = {

      primary:
        "bg-orange-500 hover:bg-orange-600 text-white",

      secondary:
        "bg-gray-200 hover:bg-gray-300 text-gray-800",

      success:
        "bg-green-500 hover:bg-green-600 text-white",

      danger:
        "bg-red-500 hover:bg-red-600 text-white",
    };

    return (

      <button

        type={type}

        disabled={
          disabled || loading
        }

        className={`

          px-5

          py-2.5

          rounded-lg

          font-medium

          transition

          duration-200

          disabled:opacity-50

          disabled:cursor-not-allowed

          ${variants[variant]}

          ${className}
        `}

        {...props}
      >

        {loading
          ? "Loading..."
          : children}

      </button>
    );
  };

export default
Button;