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

        console.log(
          "FETCHED DONATIONS:",
          foodsData
        );

        /*
        ========================================
        SAFE ARRAY CHECK
        ========================================
        */

        if (
          Array.isArray(
            foodsData
          )
        ) {
          setFoods(foodsData);
        } else {
          setFoods([]);
        }
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
  DEBUG
  ========================================
  */

  console.log(
    "FOODS STATE:",
    foods
  );

  /*
  ========================================
  LOADING UI
  ========================================
  */

  if (loading) {
    return (
      <DashboardLayout>
        <div
          className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-gray-100
        "
        >
          <h1
            className="
            text-3xl
            font-bold
          "
          >
            Loading...
          </h1>
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
        p-6
      "
      >
        {/* HEADER */}

        <div
          className="
          flex
          items-center
          gap-4
          mb-8
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
            text-4xl
            font-bold
          "
          >
            My Donations
          </h1>
        </div>

        {/* EMPTY STATE */}

        {foods.length === 0 ? (
          <div
            className="
            bg-white
            p-10
            rounded-xl
            shadow-md
            text-center
          "
          >
            <h2
              className="
              text-2xl
              font-semibold
              text-gray-600
            "
            >
              No Donations Yet
            </h2>
          </div>
        ) : (
          <div
            className="
            overflow-x-auto
          "
          >
            <table
              className="
              w-full
              bg-white
              shadow-lg
              rounded-xl
              overflow-hidden
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
                      {/* FOOD NAME */}

                      <td className="p-4 font-medium">
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

                      <td className="p-4 capitalize">
                        {
                          food.category
                        }
                      </td>

                      {/* STATUS */}

                      <td
                        className={`
                        p-4
                        font-semibold
                        capitalize
                        ${
                          food.status ===
                          "available"
                            ? "text-green-600"
                            : food.status ===
                                "claimed"
                              ? "text-yellow-500"
                              : "text-blue-500"
                        }
                      `}
                      >
                        {
                          food.status
                        }
                      </td>

                      {/* LOCATION */}

                      <td className="p-4">
                        {
                          food.location
                        }
                      </td>

                      {/* EXPIRY */}

                      <td className="p-4">
                        {new Date(
                          food.expiryTime
                        ).toLocaleString()}
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