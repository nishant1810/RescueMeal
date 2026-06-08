import React from "react";

/*
========================================
EMPTY STATE
========================================
*/

const EmptyState =
  ({

    title = "No Data Found",

    description =
      "There is nothing to display.",

    action = null,

    icon = null,

    className = "",
  }) => {

    return (

      <div

        className={`

          bg-white

          rounded-3xl

          border

          border-gray-100

          shadow-sm

          p-10

          sm:p-16

          text-center

          flex

          flex-col

          items-center

          justify-center

          ${className}
        `}
      >

        {/* ========================================
            ICON
        ======================================== */}

        {icon && (

          <div

            className="

              mb-6

              text-orange-500
            "
          >

            {icon}

          </div>
        )}

        {/* ========================================
            TITLE
        ======================================== */}

        <h2

          className="

            text-2xl

            sm:text-3xl

            font-bold

            text-gray-800

            mb-4
          "
        >

          {title}

        </h2>

        {/* ========================================
            DESCRIPTION
        ======================================== */}

        <p

          className="

            text-gray-500

            text-base

            sm:text-lg

            max-w-2xl

            leading-relaxed

            mb-8
          "
        >

          {description}

        </p>

        {/* ========================================
            ACTION
        ======================================== */}

        {action && (

          <div>

            {action}

          </div>
        )}

      </div>
    );
  };

export default EmptyState;