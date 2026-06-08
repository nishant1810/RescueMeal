import React from "react";

/*
========================================
STATUS BADGE
========================================
*/

const StatusBadge =
  ({ status }) => {

    /*
    ========================================
    STATUS STYLES
    ========================================
    */

    const styles = {

      available:
        "bg-green-100 text-green-700",

      claimed:
        "bg-yellow-100 text-yellow-700",

      delivered:
        "bg-purple-100 text-purple-700",

      pending:
        "bg-orange-100 text-orange-700",
    };

    return (

      <span

        className={`

          inline-flex

          items-center

          px-3

          py-1

          rounded-full

          text-xs

          font-semibold

          capitalize

          ${
            styles[
              status
            ] ||

            "bg-gray-100 text-gray-700"
          }
        `}
      >

        {status}

      </span>
    );
  };

export default StatusBadge;