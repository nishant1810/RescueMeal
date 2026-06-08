import React from "react";

/*
========================================
UI COMPONENTS
========================================
*/

import StatusBadge
from "../ui/StatusBadge";

/*
========================================
UTILS
========================================
*/

import {
  getImageUrl,
} from "../../utils/getImageUrl";

/*
========================================
DONATION TABLE ROW
========================================
*/

const DonationTableRow =
  ({ food }) => {

    return (

      <tr

        className="

          border-b

          border-slate-100

          hover:bg-orange-50/40

          transition-all
        "
      >

        {/* FOOD */}

        <td className="px-6 py-6">

          <div

            className="

              flex

              items-center

              gap-4
            "
          >

            <img

              src={getImageUrl(
                food?.foodImage
              )}

              alt={
                food?.foodName
              }

              loading="lazy"

              className="

                w-16

                h-16

                rounded-2xl

                object-cover

                border
              "
            />

            <div>

              <h3

                className="

                  font-bold

                  text-slate-800
                "
              >

                {
                  food?.foodName
                }

              </h3>

            </div>

          </div>

        </td>

        {/* QUANTITY */}

        <td className="px-6 py-6">

          {food?.quantity}

        </td>

        {/* CATEGORY */}

        <td className="px-6 py-6">

          <span

            className="

              bg-slate-100

              px-4

              py-1.5

              rounded-full

              text-sm

              font-semibold
            "
          >

            {food?.category}

          </span>

        </td>

        {/* STATUS */}

        <td className="px-6 py-6">

          <StatusBadge
            status={food?.status}
          />

        </td>

        {/* LOCATION */}

        <td className="px-6 py-6">

          {food?.location}

        </td>

        {/* EXPIRY */}

        <td className="px-6 py-6">

          {

            food?.expiryTime

              ? new Date(

                  food.expiryTime
                ).toLocaleString()

              : "N/A"
          }

        </td>

      </tr>
    );
  };

export default DonationTableRow;