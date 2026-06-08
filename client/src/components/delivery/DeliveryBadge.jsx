import React from "react";

/*
========================================
DELIVERY BADGE
========================================
*/

const DeliveryBadge =
  ({ status }) => {

    const styles = {

      pending:
        "bg-orange-500",

      accepted:
        "bg-blue-500",

      picked:
        "bg-purple-500",

      delivered:
        "bg-green-500",
    };

    return (

      <span

        className={`

          px-4

          py-2

          rounded-full

          text-sm

          font-semibold

          text-white

          capitalize

          ${
            styles[
              status
            ] ||

            "bg-gray-500"
          }
        `}
      >

        {status}

      </span>
    );
  };

export default DeliveryBadge;