import React, {
  useEffect,
  useState,
} from "react";

import Navbar
from "../components/Navbar";

import {
  getClaimedFood,
} from "../services/foodService";

const ClaimedFood = () => {

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
          bg-white
          text-black
          p-6
        "
      >
        {/* ========================================
            HEADING
        ======================================== */}

        <h1
          className="
            text-4xl
            font-bold
            mb-10
            text-center
          "
        >
          Claimed Food
        </h1>

        {/* ========================================
            LOADING
        ======================================== */}

        {loading ? (

          <div
            className="
              text-center
              text-xl
              mt-20
            "
          >
            Loading claimed food...
          </div>

        ) : foods.length === 0 ? (

          /* ========================================
              EMPTY STATE
          ======================================== */

          <div
            className="
              text-center
              mt-20
            "
          >
            <h2
              className="
                text-2xl
                font-semibold
              "
            >
              No Claimed Food Found
            </h2>
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
              lg:grid-cols-3
              gap-8
            "
          >
            {foods.map(
              (food) => (

                <div
                  key={
                    food._id
                  }

                  className="
                    bg-gray-800
                    shadow-xl
                    rounded-2xl
                    p-6
                    border
                    border-gray-700
                    hover:border-blue-500
                    transition
                  "
                >
                  {/* FOOD NAME */}

                  <h2
                    className="
                      text-2xl
                      font-bold
                      mb-5
                    "
                  >
                    {
                      food.foodName
                    }
                  </h2>

                  {/* DETAILS */}

                  <div
                    className="
                      space-y-2
                      text-gray-300
                    "
                  >
                    <p>
                      <span
                        className="
                          font-semibold
                          text-white
                        "
                      >
                        Quantity:
                      </span>
                      {" "}
                      {
                        food.quantity
                      }
                    </p>

                    <p>
                      <span
                        className="
                          font-semibold
                          text-white
                        "
                      >
                        Category:
                      </span>
                      {" "}
                      {
                        food.category
                      }
                    </p>

                    <p>
                      <span
                        className="
                          font-semibold
                          text-white
                        "
                      >
                        Location:
                      </span>
                      {" "}
                      {
                        food.location
                      }
                    </p>
                  </div>

                  {/* STATUS */}

                  <div
                    className="
                      mt-6
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
                        capitalize
                      "
                    >
                      {
                        food.status
                      }
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ClaimedFood;