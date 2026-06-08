import React from "react";

import {

  Package,

  MapPin,

  CheckCircle,
} from "lucide-react";

/*
========================================
UI
========================================
*/

import Button
from "../ui/Button";

/*
========================================
BADGE
========================================
*/

import DeliveryBadge
from "./DeliveryBadge";

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
VOLUNTEER DELIVERY CARD
========================================
*/

const VolunteerDeliveryCard =
  ({

    delivery,

    onAccept,

    onPicked,

    onDelivered,

    loading,
  }) => {

    const food =
      delivery?.food;

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

        {/* IMAGE */}

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

              h-64

              object-cover
            "
          />

          {/* STATUS */}

          <div

            className="

              absolute

              top-4

              right-4
            "
          >

            <DeliveryBadge
              status={
                delivery?.status
              }
            />

          </div>

        </div>

        {/* CONTENT */}

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

                className="text-blue-500"
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

              {
                delivery?.pickupAddress
              }

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

              <CheckCircle

                size={18}

                className="text-green-500"
              />

              NGO:
              {" "}

              <strong>

                {
                  delivery?.ngo
                    ?.name
                }

              </strong>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="mt-6">

            {delivery?.status ===
              "pending" && (

              <Button

                fullWidth

                onClick={() =>

                  onAccept(
                    delivery?._id
                  )
                }

                loading={loading}
              >

                Accept Delivery

              </Button>
            )}

            {delivery?.status ===
              "accepted" && (

              <Button

                fullWidth

                variant="secondary"

                onClick={() =>

                  onPicked(
                    delivery?._id
                  )
                }

                loading={loading}
              >

                Mark Picked

              </Button>
            )}

            {delivery?.status ===
              "picked" && (

              <Button

                fullWidth

                variant="success"

                onClick={() =>

                  onDelivered(
                    delivery?._id
                  )
                }

                loading={loading}
              >

                Mark Delivered

              </Button>
            )}

          </div>

        </div>

      </div>
    );
  };

export default VolunteerDeliveryCard;