import React from "react";

/*
========================================
STATS CARD
========================================
*/

const StatsCard =
  ({

    title,

    value,

    icon,

    color =
      "bg-orange-500",

    textColor =
      "text-white",

    loading = false,
  }) => {

    return (

      <div

        className="

          rounded-2xl

          shadow-sm

          border

          border-gray-100

          bg-white

          p-6

          transition-all

          duration-200

          hover:shadow-lg

          hover:-translate-y-1
        "
      >

        {/* ========================================
            HEADER
        ======================================== */}

        <div

          className="

            flex

            items-center

            justify-between

            mb-5
          "
        >

          <div>

            <p

              className="

                text-sm

                font-medium

                text-gray-500
              "
            >

              {title}

            </p>

            <h2

              className="

                text-3xl

                sm:text-4xl

                font-bold

                text-gray-900

                mt-2
              "
            >

              {loading
                ? "..."
                : value}

            </h2>

          </div>

          {/* ========================================
              ICON
          ======================================== */}

          {icon && (

            <div

              className={`

                h-14

                w-14

                rounded-2xl

                flex

                items-center

                justify-center

                ${color}

                ${textColor}
              `}
            >

              {icon}

            </div>
          )}

        </div>

      </div>
    );
  };

export default StatsCard;