import React from "react";

import {
  useEffect,
  useState,
} from "react";

import socket from "../socket";

import {
  getMyDonations,
} from "../services/foodService";

const MyDonations = () => {
  const [foods, setFoods] =
    useState([]);

  /*
  ========================================
  FETCH DONATIONS
  ========================================
  */

  const fetchDonations =
    async () => {
      try {
        const data =
          await getMyDonations();

        setFoods(data);
      } catch (error) {
        console.log(error);
      }
    };

  /*
  ========================================
  SOCKET + INITIAL FETCH
  ========================================
  */

  useEffect(() => {
    fetchDonations();

    /*
    ========================================
    REAL-TIME CLAIM UPDATE
    ========================================
    */

    socket.on(
      "foodClaimed",
      (data) => {
        fetchDonations();

        console.log(
          data.message
        );
      }
    );

    /*
    ========================================
    CLEANUP
    ========================================
    */

    return () => {
      socket.off(
        "foodClaimed"
      );
    };
  }, []);

  return (
    <div
      className="
      min-h-screen
      bg-gray-100
      p-6
    "
    >
      {/* HEADER */}

      <div className="mb-8">
        <h1
          className="
          text-4xl
          font-bold
          mb-2
        "
        >
          My Donations
        </h1>

        <p
          className="
          text-gray-500
        "
        >
          Track your donated food
          and delivery status
        </p>
      </div>

      {/* EMPTY STATE */}

      {foods.length === 0 ? (
        <div
          className="
          bg-white
          rounded-2xl
          shadow-lg
          p-10
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

          <p
            className="
            text-gray-500
            mt-2
          "
          >
            Your donated food
            will appear here.
          </p>
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
            shadow-xl
            rounded-2xl
            overflow-hidden
          "
          >
            {/* TABLE HEAD */}

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
                    <td className="p-4">
                      {
                        food.foodName
                      }
                    </td>

                    <td className="p-4">
                      {
                        food.quantity
                      }
                    </td>

                    <td className="p-4">
                      {
                        food.category
                      }
                    </td>

                    <td
                      className="
                      p-4
                      font-semibold
                    "
                    >
                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          ${
                            food.status ===
                            "available"
                              ? "bg-green-100 text-green-700"
                              : food.status ===
                                "claimed"
                              ? "bg-yellow-100 text-yellow-700"
                              : food.status ===
                                "picked"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-200 text-gray-700"
                          }
                        `}
                      >
                        {
                          food.status
                        }
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyDonations;