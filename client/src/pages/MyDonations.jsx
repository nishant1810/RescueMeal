import React, {useEffect,useState,} from "react";

import {useNavigate,} from "react-router-dom";

import {ArrowLeft,} from "lucide-react";

import Navbar from "../components/Navbar";

import TableSkeleton from "../components/TableSkeleton";

import {getMyDonations,} from "../services/foodService";

const MyDonations = () => {

  /*
  ========================================
  NAVIGATION
  ========================================
  */

  const navigate =
    useNavigate();

  /*
  ========================================
  STATE
  ========================================
  */

  const [foods, setFoods] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /*
  ========================================
  FETCH DONATIONS
  ========================================
  */

  const fetchDonations =
    async () => {

      try {

        setLoading(true);

        const foodsData =
          await getMyDonations();

        setFoods(
          Array.isArray(
            foodsData
          )
            ? foodsData
            : []
        );

      } catch (error) {

        console.log(error);

        setFoods([]);

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

    fetchDonations();

  }, []);

  /*
  ========================================
  LOADING
  ========================================
  */

  if (loading) {
    return (
      <>
        <Navbar />

        <div
          className="
            min-h-screen
            bg-gray-900
            p-6
          "
        >
          <TableSkeleton />
        </div>
      </>
    );
  }

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
          bg-gray-800
          text-white
          p-4
          md:p-6
        "
      >
        {/* ========================================
            HEADER
        ======================================== */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
            mb-8
          "
        >
          {/* LEFT */}

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            {/* TITLE */}

            <h1
              className="
                text-3xl
                md:text-4xl
                font-bold
              "
            >
              My Donations
            </h1>
          </div>

          {/* TOTAL COUNT */}

          <div
            className="
              bg-gray-800
              px-5
              py-3
              rounded-xl
              shadow-lg
              font-semibold
              border
              border-gray-700
            "
          >
            Total Donations:
            {" "}
            {foods.length}
          </div>
        </div>

        {/* ========================================
            EMPTY STATE
        ======================================== */}

        {foods.length === 0 ? (

          <div
            className="
              bg-gray-800
              p-10
              rounded-2xl
              shadow-xl
              text-center
              border
              border-gray-700
            "
          >
            <h2
              className="
                text-3xl
                font-bold
                text-white
                mb-3
              "
            >
              No Donations Yet
            </h2>

            <p
              className="
                text-gray-400
                text-lg
              "
            >
              Start helping people
              by donating food.
            </p>

            <button
              onClick={() =>
                navigate(
                  "/donate-food"
                )
              }

              className="
                mt-6
                bg-blue-500
                hover:bg-blue-600
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                transition
              "
            >
              Donate Food
            </button>
          </div>

        ) : (

          <div
            className="
              overflow-x-auto
              bg-gray-800
              rounded-2xl
              shadow-2xl
              border
              border-gray-700
            "
          >
            <table
              className="
                w-full
                min-w-[900px]
              "
            >
              {/* ========================================
                  TABLE HEADER
              ======================================== */}

              <thead
                className="
                  bg-blue-500
                  text-white
                "
              >
                <tr>
                  <th className="p-4 text-left">
                    Food
                  </th>

                  <th className="p-4 text-left">
                    Quantity
                  </th>

                  <th className="p-4 text-left">
                    Category
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Location
                  </th>

                  <th className="p-4 text-left">
                    Expiry
                  </th>
                </tr>
              </thead>

              {/* ========================================
                  TABLE BODY
              ======================================== */}

              <tbody>
                {foods.map(
                  (food) => (

                    <tr
                      key={
                        food._id
                      }

                      className="
                        border-b
                        border-gray-700
                        hover:bg-gray-700
                        transition
                      "
                    >
                      {/* FOOD */}

                      <td
                        className="
                          p-4
                          font-semibold
                        "
                      >
                        {
                          food.foodName
                        }
                      </td>

                      {/* QUANTITY */}

                      <td className="p-4">
                        {
                          food.quantity
                        }
                      </td>

                      {/* CATEGORY */}

                      <td
                        className="
                          p-4
                          capitalize
                        "
                      >
                        {
                          food.category
                        }
                      </td>

                      {/* STATUS */}

                      <td className="p-4">
                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            font-semibold
                            capitalize

                            ${
                              food.status ===
                              "available"
                                ? "bg-green-500 text-white"

                                : food.status ===
                                    "claimed"

                                ? "bg-yellow-500 text-black"

                                : "bg-blue-500 text-white"
                            }
                          `}
                        >
                          {
                            food.status
                          }
                        </span>
                      </td>

                      {/* LOCATION */}

                      <td className="p-4">
                        {
                          food.location
                        }
                      </td>

                      {/* EXPIRY */}

                      <td className="p-4">
                        {food.expiryTime
                          ? new Date(
                              food.expiryTime
                            ).toLocaleString()
                          : "N/A"}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default MyDonations;