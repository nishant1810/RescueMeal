import React from "react";

/*
========================================
SECTION CARD
========================================
*/

const SectionCard =
  ({

    title,

    action,

    children,
  }) => {

    return (

      <div

        className="

          bg-white

          rounded-2xl

          border

          border-gray-100

          shadow-sm

          overflow-hidden
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

            px-6

            py-5

            border-b

            border-gray-100
          "
        >

          <h2

            className="

              text-xl

              font-bold

              text-gray-800
            "
          >

            {title}

          </h2>

          {action}

        </div>

        {/* ========================================
            BODY
        ======================================== */}

        <div className="p-6">

          {children}

        </div>

      </div>
    );
  };

export default SectionCard;