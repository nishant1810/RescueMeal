import React, {
  useEffect,
  useState,
} from "react";

import {
  Package,
  MapPin,
  Tag,
  CheckCircle,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";

import {
  getClaimedFood,
} from "../services/food.service";

const ClaimedFood = () => {

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

  const [foods, setFoods] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  /*
  ========================================
  FETCH CLAIMED FOOD
  ========================================
  */

  const fetchClaimedFood =
    async () => {

      try {

        setLoading(true);

        const data =
          await getClaimedFood();

        setFoods(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {

        console.log(
          "Claimed Food Error:",
          error
        );

      } finally {

        setLoading(false);
      }
    };

  /*
  ========================================
  USE EFFECT
  ========================================
  */

  useEffect(() => {

    fetchClaimedFood();

  }, []);

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
              PAGE HEADER
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
                Claimed Food
              </h1>

              <p
                className="
                  text-slate-500
                  mt-3
                  text-lg
                "
              >
                Food claimed by NGO
              </p>
            </div>

            {/* TOTAL CARD */}

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
                  mb-1
                "
              >
                Total Claimed
              </p>

              <h2
                className="
                  text-4xl
                  font-bold
                  text-orange-500
                "
              >
                {foods.length}
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
                Loading claimed food...
              </h2>
            </div>

          ) : foods.length === 0 ? (

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
              <h2
                className="
                  text-3xl
                  font-bold
                  text-slate-800
                  mb-4
                "
              >
                No Claimed Food Found
              </h2>

              <p
                className="
                  text-slate-500
                  text-lg
                "
              >
                No food has been claimed yet.
              </p>
            </div>

          ) : (

            /* ========================================
                FOOD GRID
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
              {foods.map(
                (food) => {

                  /*
                  ========================================
                  IMAGE URL
                  ========================================
                  */

                  const imageUrl =
                    food.foodImage

                      ? food.foodImage.startsWith("http")

                        ? food.foodImage

                        : `${BASE_URL}/${food.foodImage.replace(/^\/+/, "")}`

                      : `https://source.unsplash.com/600x400/?${food.foodName},food`;

                  return (

                    <div
                      key={food._id}

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
                        group
                      "
                    >
                      {/* ========================================
                          IMAGE
                      ======================================== */}

                      <div
                        className="
                          relative
                          overflow-hidden
                        "
                      >
                        <img
                          src={"https://placehold.co/600x400?text=Food"}

                          alt={food.foodName}

                          onError={(e) => {

                            e.target.src =
                              `https://source.unsplash.com/600x400/?${food.foodName},food`;
                          }}

                          className="
                            w-full
                            h-64
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-105
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
                            className="
                              bg-orange-500
                              text-white
                              px-4
                              py-2
                              rounded-full
                              text-sm
                              font-semibold
                              shadow-lg
                              capitalize
                            "
                          >
                            {food.status}
                          </span>
                        </div>
                      </div>

                      {/* ========================================
                          CONTENT
                      ======================================== */}

                      <div
                        className="
                          p-6
                        "
                      >
                        {/* FOOD NAME */}

                        <h2
                          className="
                            text-2xl
                            font-bold
                            text-slate-900
                            mb-5
                          "
                        >
                          {food.foodName}
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
                                {food.quantity}
                              </strong>
                            </span>
                          </div>

                          {/* CATEGORY */}

                          <div
                            className="
                              flex
                              items-center
                              gap-3
                            "
                          >
                            <Tag
                              size={18}

                              className="
                                text-purple-500
                              "
                            />

                            <span
                              className="
                                capitalize
                              "
                            >
                              Category:
                              {" "}
                              <strong>
                                {food.category}
                              </strong>
                            </span>
                          </div>

                          {/* LOCATION */}

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
                              {food.location}
                            </span>
                          </div>

                          {/* STATUS */}

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

                            <span
                              className="
                                capitalize
                                font-medium
                              "
                            >
                              {food.status}
                            </span>
                          </div>
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

export default ClaimedFood;