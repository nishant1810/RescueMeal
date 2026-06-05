import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Navbar
from "../components/Navbar";

import TableSkeleton
from "../components/TableSkeleton";

import {
  getMyDonations,
} from "../services/foodService";

const MyDonations = () => {

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
            bg-gradient-to-br
            from-slate-50
            via-blue-50
            to-indigo-50
            px-4
            sm:px-6
            lg:px-8
            py-8
          "
        >
          <div
            className="
              max-w-7xl
              mx-auto
            "
          >
            <TableSkeleton />
          </div>
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
          bg-gradient-to-br
          from-slate-50
          via-orange-50
          to-blue-50
          px-4
          sm:px-6
          lg:px-8
          py-8
        "
      >
        {/* ========================================
            CONTAINER
        ======================================== */}

        <div
          className="
            max-w-7xl
            mx-auto
            w-full
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
                  text-2xl
                  sm:text-3xl
                  font-extrabold
                  text-slate-900
                  tracking-tight
                "
              >
                My Donations
              </h1>

              <p
                className="
                  text-slate-500
                  mt-3
                  text-lg
                "
              >
                Track all your donated
                food items in one place
              </p>
            </div>

            {/* RIGHT */}

            <div
              className="
                bg-gradient-to-r
                from-orange-500
                via-orange-400
                to-amber-400
                text-white
                rounded-3xl
                shadow-xl
                px-8
                py-5
                min-w-[150px]
                self-start
                lg:self-auto
              "
            >
              <p
                className="
                  text-blue-100
                  text-sm
                  font-medium
                "
              >
                Total Donations
              </p>

              <h2
                className="
                  text-4xl
                  font-bold
                  mt-1
                "
              >
                {foods.length}
              </h2>
            </div>
          </div>

          {/* ========================================
              EMPTY STATE
          ======================================== */}

          {foods.length === 0 ? (

            <div
              className="
                bg-white/90
                backdrop-blur-md
                rounded-3xl
                shadow-xl
                border
                border-white/40
                p-16
                text-center
              "
            >
              <h2
                className="
                  text-3xl
                  font-bold
                  text-gray-800
                  mb-4
                "
              >
                No Donations Yet
              </h2>

              <p
                className="
                  text-gray-500
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
                  mt-8
                  bg-gradient-to-r
                  from-blue-500
                  to-indigo-600
                  hover:scale-105
                  text-white
                  px-8
                  py-3
                  rounded-2xl
                  font-semibold
                  transition-all
                  duration-300
                  shadow-lg
                "
              >
                Donate Food
              </button>
            </div>

          ) : (

            /* ========================================
                TABLE SECTION
            ======================================== */

            <div
              className="
                bg-white/90
                backdrop-blur-md
                rounded-3xl
                shadow-xl
                border
                border-white/40
                overflow-hidden
                
              "
            >

              {/* TABLE */}

              <div
                className="
                  w-full
                  overflow-x-auto
                "
              >
                <table
                  className="
                    w-full
                    border-collapse
                  "
                >
                  {/* ========================================
                      TABLE HEAD
                  ======================================== */}

                  <thead
                    className="
                      bg-gradient-to-r
                      from-orange-500
                      via-orange-400
                      to-amber-400
                      text-white
                    "
                  >
                    <tr>
                      <th
                        className="
                          px-6
                          py-5
                          text-left
                          font-semibold
                        "
                      >
                        Food
                      </th>

                      <th
                        className="
                          px-6
                          py-5
                          text-left
                          font-semibold
                        "
                      >
                        Quantity
                      </th>

                      <th
                        className="
                          px-6
                          py-5
                          text-left
                          font-semibold
                        "
                      >
                        Category
                      </th>

                      <th
                        className="
                          px-6
                          py-5
                          text-left
                          font-semibold
                        "
                      >
                        Status
                      </th>

                      <th
                        className="
                          px-6
                          py-5
                          text-left
                          font-semibold
                        "
                      >
                        Location
                      </th>

                      <th
                        className="
                          px-6
                          py-5
                          text-left
                          font-semibold
                        "
                      >
                        Expiry
                      </th>
                    </tr>
                  </thead>

                  {/* ========================================
                      TABLE BODY
                  ======================================== */}

                  <tbody>
                    {foods.map(
                      (food) => {

                        /*
                        ========================================
                        IMAGE URL
                        ========================================
                        */

                        const imageUrl =

                          food.foodImage

                            ? food.foodImage.startsWith(
                                "http"
                              )

                              ? food.foodImage

                              : `${BASE_URL}/${food.foodImage.replace(/^\/+/, "")}`

                            : `https://source.unsplash.com/300x300/?${food.foodName},food`;

                        return (

                          <tr
                            key={
                              food._id
                            }

                            className="
                              border-b
                              border-slate-100
                              hover:bg-blue-50/40
                              transition-all
                              duration-200
                            "
                          >
                            {/* FOOD */}

                            <td
                              className="
                                px-6
                                py-6
                              "
                            >
                              <div
                                className="
                                  flex
                                  items-center
                                  gap-4
                                "
                              >
                                <img
                                  src={
                                    imageUrl
                                  }

                                  alt={
                                    food.foodName
                                  }

                                  loading="lazy"

                                  onError={(
                                    e
                                  ) => {

                                    e.target.onerror = null;

                                    e.target.src =
                                      `https://source.unsplash.com/300x300/?${food.foodName},meal`;
                                  }}

                                  className="
                                    w-16
                                    h-16
                                    rounded-2xl
                                    object-cover
                                    border
                                    border-slate-200
                                    shadow-sm
                                    bg-slate-100
                                    flex-shrink-0
                                  "
                                />

                                <div>
                                  <h3
                                    className="
                                      font-bold
                                      text-slate-800
                                      text-lg
                                    "
                                  >
                                    {
                                      food.foodName
                                    }
                                  </h3>
                                </div>
                              </div>
                            </td>

                            {/* QUANTITY */}

                            <td
                              className="
                                px-6
                                py-6
                                text-slate-700
                                font-semibold
                              "
                            >
                              {
                                food.quantity
                              }
                            </td>

                            {/* CATEGORY */}

                            <td
                              className="
                                px-6
                                py-6
                              "
                            >
                              <span
                                className="
                                  bg-slate-100
                                  text-slate-700
                                  px-4
                                  py-1.5
                                  rounded-full
                                  text-sm
                                  font-semibold
                                  capitalize
                                "
                              >
                                {
                                  food.category
                                }
                              </span>
                            </td>

                            {/* STATUS */}

                            <td
                              className="
                                px-6
                                py-6
                              "
                            >
                              <span
                                className={`
                                  px-4
                                  py-2
                                  rounded-full
                                  text-sm
                                  font-semibold
                                  capitalize

                                  ${
                                    food.status ===
                                    "available"

                                      ? `
                                        bg-green-100
                                        text-green-700
                                      `

                                      : food.status ===
                                        "claimed"

                                      ? `
                                        bg-yellow-100
                                        text-yellow-700
                                      `

                                      : `
                                        bg-purple-100
                                        text-purple-700
                                      `
                                  }
                                `}
                              >
                                {
                                  food.status
                                }
                              </span>
                            </td>

                            {/* LOCATION */}

                            <td
                              className="
                                px-6
                                py-6
                                text-slate-700
                              "
                            >
                              {
                                food.location
                              }
                            </td>

                            {/* EXPIRY */}

                            <td
                              className="
                                px-6
                                py-6
                                text-slate-500
                              "
                            >
                              {
                                food.expiryTime

                                  ? new Date(
                                      food.expiryTime
                                    ).toLocaleString()

                                  : "N/A"
                              }
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyDonations;