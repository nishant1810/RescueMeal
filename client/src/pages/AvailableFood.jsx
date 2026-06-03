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

import toast from "react-hot-toast";

import socket from "../socket";

import FoodCard from "../components/FoodCard";

import TableSkeleton from "../components/TableSkeleton";

import {
  getAllFood,
} from "../services/foodService";

const AvailableFood = () => {
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

  const [filteredFoods,
    setFilteredFoods] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [categoryFilter,
    setCategoryFilter] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
    useState("");

  const [loading,
    setLoading] =
    useState(true);

  /*
  ========================================
  PAGINATION
  ========================================
  */

  const [page,
    setPage] =
    useState(1);

  const [totalPages,
    setTotalPages] =
    useState(1);

  /*
  ========================================
  FETCH FOOD
  ========================================
  */

  const fetchFood =
    async () => {
      try {
        setLoading(true);

        /*
        ========================================
        API CALL
        ========================================
        */

        const data =
          await getAllFood(
            page,
            6
          );

        /*
        ========================================
        SAFE ARRAY
        ========================================
        */

        const safeFoods =
          Array.isArray(
            data?.foods
          )
            ? data.foods
            : [];

        /*
        ========================================
        UPDATE STATE
        ========================================
        */

        setFoods(safeFoods);

        setFilteredFoods(
          safeFoods
        );

        setTotalPages(
          data?.totalPages ||
            1
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to load food"
        );

        setFoods([]);

        setFilteredFoods([]);

        setTotalPages(1);
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
    fetchFood();
  }, [page]);

  /*
  ========================================
  SOCKET EVENTS
  ========================================
  */

  useEffect(() => {
    socket.on(
      "newFoodDonation",
      (data) => {
        fetchFood();

        toast.success(
          data?.message ||
            "New food donated"
        );
      }
    );

    return () => {
      socket.off(
        "newFoodDonation"
      );
    };
  }, [page]);

  /*
  ========================================
  FILTER LOGIC
  ========================================
  */

  useEffect(() => {
    let updatedFoods =
      [...foods];

    /*
    ========================================
    SEARCH FILTER
    ========================================
    */

    if (search) {
      updatedFoods =
        updatedFoods.filter(
          (food) =>
            food.foodName
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )
        );
    }

    /*
    ========================================
    CATEGORY FILTER
    ========================================
    */

    if (categoryFilter) {
      updatedFoods =
        updatedFoods.filter(
          (food) =>
            food.category ===
            categoryFilter
        );
    }

    /*
    ========================================
    STATUS FILTER
    ========================================
    */

    if (statusFilter) {
      updatedFoods =
        updatedFoods.filter(
          (food) =>
            food.status ===
            statusFilter
        );
    }

    setFilteredFoods(
      updatedFoods
    );
  }, [
    foods,
    search,
    categoryFilter,
    statusFilter,
  ]);

  /*
  ========================================
  LOADING UI
  ========================================
  */

  if (loading) {
    return (
      <div className="p-6">
        <TableSkeleton />
      </div>
    );
  }

  return (
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
        lg:flex-row
        lg:justify-between
        lg:items-center
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
            Available Food
          </h1>
        </div>

        {/* TOTAL */}

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
          Total Food:
          {" "}
          {filteredFoods.length}
        </div>
      </div>

      {/* FILTER SECTION */}

      <div
        className="
        bg-white
        p-4
        rounded-2xl
        shadow-md
        mb-8
        grid
        grid-cols-1
        md:grid-cols-3
        gap-4
      "
      >
        {/* SEARCH */}

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
          border
          p-3
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
        "
        />

        {/* CATEGORY */}

        <select
          value={
            categoryFilter
          }
          onChange={(e) =>
            setCategoryFilter(
              e.target.value
            )
          }
          className="
          border
          p-3
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
        "
        >
          <option value="">
            All Categories
          </option>

          <option value="Veg">
            Veg
          </option>

          <option value="Non-Veg">
            Non-Veg
          </option>

          <option value="Packed Food">
            Packed Food
          </option>

          <option value="Bakery">
            Bakery
          </option>
        </select>

        {/* STATUS */}

        <select
          value={
            statusFilter
          }
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="
          border
          p-3
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
        "
        >
          <option value="">
            All Status
          </option>

          <option value="available">
            Available
          </option>

          <option value="claimed">
            Claimed
          </option>

          <option value="delivered">
            Delivered
          </option>
        </select>
      </div>

      {/* EMPTY STATE */}

      {filteredFoods.length ===
      0 ? (
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
            No Food Found
          </h2>

          <p
            className="
            text-gray-500
          "
          >
            Try changing search
            or filters.
          </p>
        </div>
      ) : (
        <>
          {/* FOOD GRID */}

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
          "
          >
            {filteredFoods.map(
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

          {/* PAGINATION */}

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
              disabled={
                page === 1
              }
              onClick={() =>
                setPage(
                  page - 1
                )
              }
              className="
              px-5
              py-2
              rounded-lg
              bg-black
              text-white
              disabled:bg-gray-400
            "
            >
              Previous
            </button>

            {/* PAGE INFO */}

            <span
              className="
              font-semibold
              text-lg
            "
            >
              Page {page} of{" "}
              {totalPages}
            </span>

            {/* NEXT */}

            <button
              disabled={
                page ===
                totalPages
              }
              onClick={() =>
                setPage(
                  page + 1
                )
              }
              className="
              px-5
              py-2
              rounded-lg
              bg-black
              text-white
              disabled:bg-gray-400
            "
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AvailableFood;