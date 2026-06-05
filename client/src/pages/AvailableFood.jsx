import React, {
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  Search,
  MapPin,
} from "lucide-react";

import Navbar
from "../components/Navbar";

import FoodCard
from "../components/FoodCard";

import FoodModal
from "../components/FoodModal";

import {
  getAllFood,
  getNearbyFood,
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
  SEARCH + FILTER
  ========================================
  */

  const [search, setSearch] =
    useState("");

  const [category,
    setCategory] =
    useState("all");

  /*
  ========================================
  MODAL
  ========================================
  */

  const [selectedFood,
    setSelectedFood] =
    useState(null);

  /*
  ========================================
  USER LOCATION
  ========================================
  */

  const [userLocation,
    setUserLocation] =
    useState({
      lat: null,
      lng: null,
    });

  /*
  ========================================
  GET LOCATION
  ========================================
  */

  useEffect(() => {

    if (
      navigator.geolocation
    ) {

      navigator.geolocation.getCurrentPosition(

        (position) => {

          setUserLocation({
            lat:
              position.coords.latitude,

            lng:
              position.coords.longitude,
          });
        },

        (error) => {

          console.log(
            "LOCATION ERROR:",
            error
          );
        }
      );
    }

  }, []);

  /*
  ========================================
  FETCH FOOD
  ========================================
  */

  const fetchFood =
    useCallback(
      async () => {

        try {

          setLoading(true);

          let data;

          /*
          ========================================
          NEARBY FOOD
          ========================================
          */

          if (
            userLocation.lat &&
            userLocation.lng
          ) {

            data =
              await getNearbyFood(
                userLocation.lat,
                userLocation.lng
              );

            setFoods(
              data?.foods || []
            );

            setTotalPages(1);

          } else {

            /*
            ========================================
            ALL FOOD
            ========================================
            */

            data =
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
          }

        } catch (error) {

          console.log(
            "FETCH FOOD ERROR:",
            error
          );

        } finally {

          setLoading(false);
        }
      },

      [
        page,
        userLocation,
      ]
    );

  /*
  ========================================
  FETCH ON CHANGE
  ========================================
  */

  useEffect(() => {

    fetchFood();

  }, [fetchFood]);

  /*
  ========================================
  FILTER FOOD
  ========================================
  */

  const filteredFoods =
    foods.filter((food) => {

      const matchesSearch =
        food.foodName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =

        category === "all"

          ? true

          : food.category
              ?.toLowerCase() ===
            category.toLowerCase();

      return (
        matchesSearch &&
        matchesCategory
      );
    });

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
          md:px-8
          py-8
        "
      >
        {/* ========================================
            HEADER
        ======================================== */}

        <div
          className="
            text-center
            mb-10
          "
        >
          <h1
            className="
              text-4xl
              md:text-5xl
              font-bold
              text-gray-800
            "
          >
            Nearby Food
          </h1>

          <p
            className="
              text-gray-500
              mt-3
              text-lg
            "
          >
            Find available food near your location
          </p>
        </div>

        {/* ========================================
            SEARCH + FILTER
        ======================================== */}

        <div
          className="
            bg-white
            rounded-3xl
            shadow-md
            p-5
            mb-10
            flex
            flex-col
            lg:flex-row
            gap-4
            items-center
          "
        >
          {/* SEARCH */}

          <div
            className="
              flex-1
              w-full
              relative
            "
          >
            <Search
              size={20}

              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"

              placeholder="Search food..."

              value={search}

              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }

              className="
                w-full
                pl-12
                pr-4
                py-4
                border
                border-gray-200
                rounded-2xl
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          {/* CATEGORY */}

          <select
            value={category}

            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }

            className="
              w-full
              lg:w-64
              border
              border-gray-200
              rounded-2xl
              px-4
              py-4
              outline-none
              focus:ring-2
              focus:ring-blue-500
              bg-white
            "
          >
            <option value="all">
              All Categories
            </option>

            <option value="veg">
              Veg
            </option>

            <option value="non-veg">
              Non-Veg
            </option>

            <option value="packed food">
              Packed Food
            </option>

            <option value="bakery">
              Bakery
            </option>
          </select>
        </div>

        {/* ========================================
            LOCATION INFO
        ======================================== */}

        {userLocation.lat && (

          <div
            className="
              flex
              items-center
              gap-2
              text-green-600
              font-medium
              mb-6
            "
          >
            <MapPin size={18} />

            Showing nearby food
            based on your location
          </div>
        )}

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
                text-gray-600
              "
            >
              Loading nearby food...
            </h2>
          </div>

        ) : filteredFoods.length === 0 ? (

          /* ========================================
              EMPTY STATE
          ======================================== */

          <div
            className="
              bg-white
              rounded-3xl
              shadow-md
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
              No Nearby Food Found
            </h2>

            <p
              className="
                text-gray-500
                text-lg
              "
            >
              Try changing search
              or category filter.
            </p>
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
                xl:grid-cols-3
                gap-8
              "
            >
              {filteredFoods.map(
                (food) => (

                  <div
                    key={
                      food._id
                    }

                    onClick={() =>
                      setSelectedFood(
                        food
                      )
                    }

                    className="
                      cursor-pointer
                    "
                  >
                    <FoodCard
                      food={food}

                      refreshFood={
                        fetchFood
                      }

                      userLocation={
                        userLocation
                      }
                    />
                  </div>
                )
              )}
            </div>

            {/* ========================================
                PAGINATION
            ======================================== */}

            {!userLocation.lat && (

              <div
                className="
                  flex
                  justify-center
                  items-center
                  gap-4
                  mt-12
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
                    px-6
                    py-3
                    rounded-xl
                    bg-blue-500
                    text-white
                    font-semibold
                    hover:bg-blue-600
                    disabled:bg-gray-300
                    transition
                  "
                >
                  Previous
                </button>

                {/* PAGE */}

                <div
                  className="
                    bg-white
                    px-5
                    py-3
                    rounded-xl
                    shadow
                    font-semibold
                  "
                >
                  Page {page}
                  {" "}of{" "}
                  {totalPages}
                </div>

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
                    px-6
                    py-3
                    rounded-xl
                    bg-blue-500
                    text-white
                    font-semibold
                    hover:bg-blue-600
                    disabled:bg-gray-300
                    transition
                  "
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* ========================================
            FOOD MODAL
        ======================================== */}

        <FoodModal
          food={selectedFood}

          onClose={() =>
            setSelectedFood(
              null
            )
          }
        />
      </div>
    </>
  );
};

export default AvailableFood;