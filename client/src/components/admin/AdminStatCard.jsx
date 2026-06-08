import React from "react";

/*
========================================
ADMIN STAT CARD
========================================
*/

const AdminStatCard =
  ({

    title,

    value,

    icon,

    color,
  }) => {

    return (

      <div

        className={`

          rounded-3xl

          p-6

          shadow-lg

          text-white

          ${color}
        `}
      >

        {/* ICON */}

        <div className="mb-4">

          {icon}

        </div>

        {/* VALUE */}

        <h2

          className="

            text-4xl

            font-bold
          "
        >

          {value}

        </h2>

        {/* TITLE */}

        <p

          className="

            mt-2

            text-lg

            opacity-90
          "
        >

          {title}

        </p>

      </div>
    );
  };

export default AdminStatCard;