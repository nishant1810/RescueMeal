import React, {useEffect,useState,} from "react";

import toast from "react-hot-toast";

import {Truck,MapPin,Package,CheckCircle,} from "lucide-react";

import Navbar from "../../components/layout/Navbar";

import {getAvailableDeliveries,acceptDelivery,markPicked,markDelivered,} from "../../services/deliveryService";

const Deliveries = () => {

  /*
  ========================================
  BASE URL
  ========================================
  */

  const BASE_URL =
    import.meta.env
      .VITE_API_URL ||
    "http://localhost:5000";

  /*
  ========================================
  STATE
  ========================================
  */

  const [
    deliveries,

    setDeliveries,
  ] = useState([]);

  const [
    loading,

    setLoading,
  ] = useState(false);

  /*
  ========================================
  FETCH DELIVERIES
  ========================================
  */

  const fetchDeliveries =
    async () => {

      try {

        setLoading(true);

        const data =
          await getAvailableDeliveries();

        setDeliveries(
          data || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  /*
  ========================================
  INITIAL LOAD
  ========================================
  */

  useEffect(() => {

    fetchDeliveries();

  }, []);

  /*
  ========================================
  ACCEPT DELIVERY
  ========================================
  */

  const handleAccept =
    async (id) => {

      try {

        await acceptDelivery(id);

        toast.success(
          "Delivery Accepted"
        );

        fetchDeliveries();

      } catch (error) {

        toast.error(

          error.response?.data
            ?.message ||

          "Error accepting delivery"
        );
      }
    };

  /*
  ========================================
  MARK PICKED
  ========================================
  */

  const handlePicked =
    async (id) => {

      try {

        await markPicked(id);

        toast.success(
          "Food Picked"
        );

        fetchDeliveries();

      } catch (error) {

        toast.error(

          error.response?.data
            ?.message ||

          "Error updating delivery"
        );
      }
    };

  /*
  ========================================
  MARK DELIVERED
  ========================================
  */

  const handleDelivered =
    async (id) => {

      try {

        await markDelivered(id);

        toast.success(
          "Food Delivered"
        );

        fetchDeliveries();

      } catch (error) {

        toast.error(

          error.response?.data
            ?.message ||

          "Error delivering food"
        );
      }
    };

  return (
    <>
      {/* ========================================
          NAVBAR
      ======================================== */}

      <Navbar />

      {/* ========================================
          PAGE
      ======================================== */}

      <div
        className="
          min-h-screen
          bg-gradient-to-br
          from-slate-50
          via-orange-50
          to-blue-50
          py-10
        "
      >
        {/* ========================================
            CONTAINER
        ======================================== */}

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
          "
        >
          {/* ========================================
              HEADER
          ======================================== */}

          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-6
              mb-10
            "
          >
            {/* LEFT */}

            <div>
              <h1
                className="
                  text-4xl
                  md:text-5xl
                  font-bold
                  text-slate-900
                "
              >
                Deliveries
              </h1>

              <p
                className="
                  text-slate-500
                  mt-3
                  text-lg
                "
              >
                Manage food deliveries
              </p>
            </div>

            {/* TOTAL */}

            <div
              className="
                bg-white/90
                backdrop-blur-md
                border
                border-white/50
                shadow-xl
                rounded-3xl
                px-8
                py-5
                min-w-[180px]
              "
            >
              <p
                className="
                  text-slate-500
                  text-sm
                "
              >
                Total Deliveries
              </p>

              <h2
                className="
                  text-4xl
                  font-bold
                  text-orange-500
                  mt-1
                "
              >
                {
                  deliveries.length
                }
              </h2>
            </div>
          </div>

          {/* ========================================
              LOADING
          ======================================== */}

          {loading ? (

            <div
              className="
                flex
                justify-center
                items-center
                h-[50vh]
              "
            >
              <h2
                className="
                  text-2xl
                  font-semibold
                  text-slate-600
                "
              >
                Loading deliveries...
              </h2>
            </div>

          ) : deliveries.length === 0 ? (

            /* ========================================
                EMPTY STATE
            ======================================== */

            <div
              className="
                bg-white
                rounded-3xl
                shadow-xl
                p-16
                text-center
              "
            >
              <Truck
                size={70}

                className="
                  mx-auto
                  text-orange-400
                  mb-6
                "
              />

              <h2
                className="
                  text-3xl
                  font-bold
                  text-slate-800
                  mb-4
                "
              >
                No Deliveries Available
              </h2>

              <p
                className="
                  text-slate-500
                  text-lg
                "
              >
                No delivery requests found.
              </p>
            </div>

          ) : (

            /* ========================================
                DELIVERY GRID
            ======================================== */

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-8
              "
            >
              {deliveries.map(
                (delivery) => {

                  const food =
                    delivery.food;

                  /*
                  ========================================
                  IMAGE URL
                  ========================================
                  */

                  const imageUrl =

                    food?.foodImage

                      ? food.foodImage.startsWith(
                          "http"
                        )

                        ? food.foodImage

                        : `${BASE_URL}/${food.foodImage.replace(/^\/+/, "")}`

                      : `https://source.unsplash.com/600x400/?food`;

                  return (

                    <div
                      key={
                        delivery._id
                      }

                      className="
                        bg-white/90
                        backdrop-blur-md
                        rounded-3xl
                        overflow-hidden
                        shadow-lg
                        hover:shadow-2xl
                        transition-all
                        duration-300
                        border
                        border-white/50
                      "
                    >
                      {/* IMAGE */}

                      <div
                        className="
                          relative
                        "
                      >
                        <img
                          src={
                            imageUrl
                          }

                          alt={
                            food?.foodName
                          }

                          onError={(
                            e
                          ) => {

                            e.target.src =
                              "https://source.unsplash.com/600x400/?meal";
                          }}

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
                                delivery.status ===
                                "pending"

                                  ? "bg-orange-500"

                                  : delivery.status ===
                                    "accepted"

                                  ? "bg-blue-500"

                                  : delivery.status ===
                                    "picked"

                                  ? "bg-purple-500"

                                  : "bg-green-500"
                              }
                            `}
                          >
                            {
                              delivery.status
                            }
                          </span>
                        </div>
                      </div>

                      {/* CONTENT */}

                      <div
                        className="
                          p-6
                        "
                      >
                        {/* FOOD */}

                        <h2
                          className="
                            text-2xl
                            font-bold
                            text-slate-900
                            mb-5
                          "
                        >
                          {
                            food?.foodName
                          }
                        </h2>

                        {/* DETAILS */}

                        <div
                          className="
                            space-y-4
                            text-slate-600
                          "
                        >
                          {/* QUANTITY */}

                          <div
                            className="
                              flex
                              items-center
                              gap-3
                            "
                          >
                            <Package
                              size={18}

                              className="
                                text-blue-500
                              "
                            />

                            <span>
                              Quantity:
                              {" "}
                              <strong>
                                {
                                  food?.quantity
                                }
                              </strong>
                            </span>
                          </div>

                          {/* PICKUP */}

                          <div
                            className="
                              flex
                              items-center
                              gap-3
                            "
                          >
                            <MapPin
                              size={18}

                              className="
                                text-red-500
                              "
                            />

                            <span>
                              {
                                delivery.pickupAddress
                              }
                            </span>
                          </div>

                          {/* NGO */}

                          <div
                            className="
                              flex
                              items-center
                              gap-3
                            "
                          >
                            <CheckCircle
                              size={18}

                              className="
                                text-green-500
                              "
                            />

                            <span>
                              NGO:
                              {" "}
                              {
                                delivery.ngo
                                  ?.name
                              }
                            </span>
                          </div>
                        </div>

                        {/* ========================================
                            ACTION BUTTONS
                        ======================================== */}

                        <div
                          className="
                            mt-6
                            flex
                            flex-col
                            gap-3
                          "
                        >
                          {/* ACCEPT */}

                          {
                            delivery.status ===
                            "pending" && (

                              <button
                                onClick={() =>
                                  handleAccept(
                                    delivery._id
                                  )
                                }

                                className="
                                  w-full
                                  bg-orange-500
                                  hover:bg-orange-600
                                  text-white
                                  py-3
                                  rounded-2xl
                                  font-semibold
                                  transition
                                "
                              >
                                Accept Delivery
                              </button>
                            )
                          }

                          {/* PICK */}

                          {
                            delivery.status ===
                            "accepted" && (

                              <button
                                onClick={() =>
                                  handlePicked(
                                    delivery._id
                                  )
                                }

                                className="
                                  w-full
                                  bg-blue-500
                                  hover:bg-blue-600
                                  text-white
                                  py-3
                                  rounded-2xl
                                  font-semibold
                                  transition
                                "
                              >
                                Mark Picked
                              </button>
                            )
                          }

                          {/* DELIVER */}

                          {
                            delivery.status ===
                            "picked" && (

                              <button
                                onClick={() =>
                                  handleDelivered(
                                    delivery._id
                                  )
                                }

                                className="
                                  w-full
                                  bg-green-500
                                  hover:bg-green-600
                                  text-white
                                  py-3
                                  rounded-2xl
                                  font-semibold
                                  transition
                                "
                              >
                                Mark Delivered
                              </button>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Deliveries;