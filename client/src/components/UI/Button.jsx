import React from "react";

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

    size = "md",

    fullWidth = false,

    loading = false,

    disabled = false,

    leftIcon,

    rightIcon,

    onClick,

    className = "",
  }) => {

    /*
    ========================================
    VARIANT STYLES
    ========================================
    */

    const variants = {

      primary: `
        bg-orange-500
        hover:bg-orange-600
        text-white
      `,

      secondary: `
        bg-slate-200
        hover:bg-slate-300
        text-slate-800
      `,

      success: `
        bg-green-500
        hover:bg-green-600
        text-white
      `,

      danger: `
        bg-red-500
        hover:bg-red-600
        text-white
      `,

      outline: `
        border
        border-orange-500
        text-orange-500
        hover:bg-orange-50
      `,
    };

    /*
    ========================================
    SIZE STYLES
    ========================================
    */

    const sizes = {

      sm: `
        px-4
        py-2
        text-sm
      `,

      md: `
        px-5
        py-3
        text-base
      `,

      lg: `
        px-7
        py-4
        text-lg
      `,
    };

    return (

      <button

        type={type}

        disabled={
          disabled || loading
        }

        onClick={onClick}

        className={`

          inline-flex

          items-center

          justify-center

          gap-2

          rounded-xl

          font-semibold

          transition-all

          duration-200

          shadow-sm

          disabled:opacity-50

          disabled:cursor-not-allowed

          focus:outline-none

          focus:ring-2

          focus:ring-orange-400

          ${variants[variant]}

          ${sizes[size]}

          ${
            fullWidth
              ? "w-full"
              : ""
          }

          ${className}
        `}
      >

        {/* ========================================
            LOADING SPINNER
        ======================================== */}

        {loading && (

          <div

            className="

              w-5

              h-5

              border-2

              border-white

              border-t-transparent

              rounded-full

              animate-spin
            "
          />
        )}

        {/* ========================================
            LEFT ICON
        ======================================== */}

        {!loading &&
          leftIcon}

        {/* ========================================
            BUTTON TEXT
        ======================================== */}

        <span>

          {loading
            ? "Loading..."
            : children}

        </span>

        {/* ========================================
            RIGHT ICON
        ======================================== */}

        {!loading &&
          rightIcon}

      </button>
    );
  };

export default Button;