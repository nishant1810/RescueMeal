import React, {
  useEffect,
  useState,
} from "react";

import Navbar
from "../components/Navbar";

import FoodCard
from "../components/FoodCard";

import {
  getAllFood,
} from "../services/foodService";

const AvailableFood = () => {

  /*
  ========================================
  STATE
  ========================================
  */

  const [foods, setFoods] =
    useState([]);

  const [page, setPage] =
    useState(1);

  const [totalPages,
    setTotalPages] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  /*
  ========================================
  FETCH FOOD
  ========================================
  */

  const fetchFood =
    async () => {

      try {

        setLoading(true);

        const data =
          await getAllFood(
            page,
            6
          );

        setFoods(
          data?.foods || []
        );

        setTotalPages(
          data?.totalPages || 1
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

    fetchFood();

  }, [page]);

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
            mb-8
            text-center
          "
        >
          Available Food
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
            Loading food...
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
              No Food Available
            </h2>
          </div>

        ) : (

          <>
            {/* ========================================
                FOOD GRID
            ======================================== */}

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
                  <FoodCard
                    key={
                      food._id
                    }

                    food={food}

                    refreshFood={
                      fetchFood
                    }
                  />
                )
              )}
            </div>

            {/* ========================================
                PAGINATION
            ======================================== */}

            <div
              className="
                flex
                justify-center
                items-center
                gap-4
                mt-10
              "
            >
              {/* PREVIOUS */}

              <button
                onClick={() =>
                  setPage(
                    (prev) =>
                      Math.max(
                        prev - 1,
                        1
                      )
                  )
                }

                disabled={
                  page === 1
                }

                className="
                  bg-blue-500
                  text-white
                  px-5
                  py-2
                  rounded-lg
                  hover:bg-blue-600
                  disabled:bg-gray-500
                "
              >
                Previous
              </button>

              {/* PAGE */}

              <span
                className="
                  text-lg
                  font-semibold
                "
              >
                Page {page}
                {" "}of{" "}
                {totalPages}
              </span>

              {/* NEXT */}

              <button
                onClick={() =>
                  setPage(
                    (prev) =>
                      Math.min(
                        prev + 1,
                        totalPages
                      )
                  )
                }

                disabled={
                  page ===
                  totalPages
                }

                className="
                  bg-blue-500
                  text-white
                  px-5
                  py-2
                  rounded-lg
                  hover:bg-blue-600
                  disabled:bg-gray-500
                "
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AvailableFood;