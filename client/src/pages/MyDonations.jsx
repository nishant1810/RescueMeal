import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";

import TableSkeleton from "../components/TableSkeleton";

import {
  getMyDonations,
} from "../services/foodService";

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

        /*
        ========================================
        SAFE ARRAY CHECK
        ========================================
        */

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
  LOADING UI
  ========================================
  */

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <TableSkeleton />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div
        className="
        min-h-screen
        bg-gray-100
        p-4
        md:p-6
      "
      >
        {/* HEADER */}

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
          <div
            className="
            flex
            items-center
            gap-4
          "
          >
            {/* BACK BUTTON */}

            <button
              onClick={() =>
                navigate(
                  "/dashboard"
                )
              }
              className="
              flex
              items-center
              gap-2
              bg-black
              text-white
              px-4
              py-2
              rounded-lg
              hover:bg-gray-800
              transition
            "
            >
              <ArrowLeft
                size={18}
              />

              Back
            </button>

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

          {/* COUNT */}

          <div
            className="
            bg-white
            px-5
            py-3
            rounded-xl
            shadow-md
            font-semibold
          "
          >
            Total Donations:
            {" "}
            {foods.length}
          </div>
        </div>

        {/* EMPTY STATE */}

        {foods.length === 0 ? (
          <div
            className="
            bg-white
            p-10
            rounded-2xl
            shadow-md
            text-center
          "
          >
            <h2
              className="
              text-2xl
              font-bold
              text-gray-600
              mb-2
            "
            >
              No Donations Yet
            </h2>

            <p
              className="
              text-gray-500
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
              bg-green-500
              hover:bg-green-600
              text-white
              px-6
              py-3
              rounded-lg
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
            bg-white
            rounded-2xl
            shadow-lg
          "
          >
            <table
              className="
              w-full
              min-w-[900px]
            "
            >
              {/* TABLE HEADER */}

              <thead
                className="
                bg-green-500
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

              {/* TABLE BODY */}

              <tbody>
                {foods.map(
                  (food) => (
                    <tr
                      key={
                        food._id
                      }
                      className="
                      border-b
                      hover:bg-gray-50
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
                                ? "bg-green-100 text-green-700"
                                : food.status ===
                                    "claimed"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-blue-100 text-blue-700"
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
    </DashboardLayout>
  );
};

export default MyDonations;