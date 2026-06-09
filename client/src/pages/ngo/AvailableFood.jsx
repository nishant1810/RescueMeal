import React, {
  useMemo,
  useState,
} from "react";

import {
  Search,
} from "lucide-react";

import DashboardLayout
from "../../layouts/DashboardLayout.jsx";

import useUserLocation
from "../../hooks/location/useUserLocation.js";

import useAvailableFood
from "../../hooks/queries/useAvailableFood.js";

import Loader
from "../../components/ui/Loader.jsx";

import EmptyState
from "../../components/ui/EmptyState.jsx";

import PageHeader
from "../../components/ui/PageHeader.jsx";

import FoodGrid
from "../../components/food/FoodGrid.jsx";

const AvailableFood = () => {

  const [
    page,
    setPage,
  ] = useState(1);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    category,
    setCategory,
  ] = useState("all");

  const {
    location: userLocation,
  } = useUserLocation();

  const {
    data,
    isLoading,
  } = useAvailableFood(
    page,
    userLocation
  );

  /*
  ========================================
  FOOD DATA
  ========================================
  */

  const foods = data || [];

  /*
  ========================================
  FILTERED FOODS
  ========================================
  */

  const filteredFoods = useMemo(() => {

    return foods.filter((food) => {

      const foodName = (
        food?.foodName ||
        ""
      ).toLowerCase();

      const foodCategory = (
        food?.category ||
        ""
      ).toLowerCase();

      const matchesSearch =
        foodName.includes(
          search.toLowerCase()
        );

      const matchesCategory =

        category === "all"

          ? true

          : foodCategory ===
            category.toLowerCase();

      return (
        matchesSearch &&
        matchesCategory
      );

    });

  }, [
    foods,
    search,
    category,
  ]);

  /*
  ========================================
  LOADING
  ========================================
  */

  if (isLoading) {

    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  return (

    <DashboardLayout>

      <div
        className="
          max-w-7xl
          mx-auto
        "
      >

        <PageHeader
          title="Available Food"
          description="Find and claim nearby food donations."
        />

        {/* SEARCH + FILTER */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            gap-4
            mb-8
          "
        >

          {/* SEARCH */}

          <div
            className="
              flex-1
              relative
            "
          >

            <Search
              size={20}
              className="
                absolute
                left-5
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
                bg-white
                border
                border-gray-200
                rounded-2xl
                py-4
                pl-14
                pr-5
                text-lg
                shadow-sm
                focus:outline-none
                focus:ring-2
                focus:ring-orange-400
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
              bg-white
              border
              border-gray-200
              rounded-2xl
              px-5
              py-4
              min-w-[220px]
            "
          >

            <option value="all">
              All Categories
            </option>

            <option value="veg">
              Veg
            </option>

            <option value="non-veg">
              Non Veg
            </option>

            <option value="bakery">
              Bakery
            </option>

          </select>

        </div>

        {/* FOOD LIST */}

        {filteredFoods.length === 0 ? (

          <EmptyState
            title="No Food Found"
            description="No food matches your search."
          />

        ) : (

          <FoodGrid
            foods={filteredFoods}
            userLocation={userLocation}
          />

        )}

      </div>

    </DashboardLayout>
  );
};

export default AvailableFood;