import React from "react";

import {

  MapPin,

  Package,

  Clock,

  User,
} from "lucide-react";

/*
========================================
UI COMPONENTS
========================================
*/

import Button
from "../ui/Button";

import DeliveryStatus
from "../food/DeliveryStatus";

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
DELIVERY CARD
========================================
*/

const DeliveryCard =
  ({

    food,

    onDelivered,

    loading,
  }) => {

    return (

      <div

        className="

          bg-white

          rounded-3xl

          overflow-hidden

          border

          border-gray-100

          shadow-sm

          hover:shadow-xl

          transition-all

          duration-300
        "
      >

        {/* ========================================
            IMAGE
        ======================================== */}

        <div className="relative">

          <img

            src={getImageUrl(
              food?.foodImage
            )}

            alt={
              food?.foodName
            }

            className="

              w-full

              h-60

              object-cover
            "
          />

          <div

            className="

              absolute

              top-4

              right-4
            "
          >

            <DeliveryStatus
              status={food?.status}
            />

          </div>

        </div>

        {/* ========================================
            CONTENT
        ======================================== */}

        <div className="p-6">

          {/* TITLE */}

          <h2

            className="

              text-2xl

              font-bold

              text-gray-900

              mb-5
            "
          >

            {food?.foodName}

          </h2>

          {/* DETAILS */}

          <div className="space-y-4">

            {/* QUANTITY */}

            <div

              className="

                flex

                items-center

                gap-3

                text-gray-600
              "
            >

              <Package

                size={18}

                className="text-orange-500"
              />

              Quantity:
              {" "}

              <strong>

                {food?.quantity}

              </strong>

            </div>

            {/* LOCATION */}

            <div

              className="

                flex

                items-center

                gap-3

                text-gray-600
              "
            >

              <MapPin

                size={18}

                className="text-red-500"
              />

              {food?.location}

            </div>

            {/* NGO */}

            <div

              className="

                flex

                items-center

                gap-3

                text-gray-600
              "
            >

              <User

                size={18}

                className="text-blue-500"
              />

              NGO:
              {" "}

              <strong>

                {

                  food?.claimedBy
                    ?.name ||

                  "NGO"
                }

              </strong>

            </div>

            {/* EXPIRY */}

            <div

              className="

                flex

                items-center

                gap-3

                text-gray-600
              "
            >

              <Clock

                size={18}

                className="text-purple-500"
              />

              {

                food?.expiryTime

                  ? new Date(

                      food.expiryTime
                    ).toLocaleString()

                  : "N/A"
              }

            </div>

          </div>

          {/* ACTION */}

          <div className="mt-6">

            <Button

              fullWidth

              variant="success"

              onClick={() =>

                onDelivered(
                  food?._id
                )
              }

              loading={loading}
            >

              Mark Delivered

            </Button>

          </div>

        </div>

      </div>
    );
  };

export default DeliveryCard;