import React from "react";

import {
  useQuery,
} from "@tanstack/react-query";

/*
========================================
LAYOUT
========================================
*/

import DashboardLayout
from "../../layouts/DashboardLayout";

/*
========================================
SERVICES
========================================
*/

import {
  getClaimedFood,
} from "../../services/food.service";

/*
========================================
UI COMPONENTS
========================================
*/

import Loader
from "../../components/ui/Loader";

import EmptyState
from "../../components/ui/EmptyState";

import PageHeader
from "../../components/ui/PageHeader";

/*
========================================
FOOD COMPONENTS
========================================
*/

import ClaimedFoodCard
from "../../components/food/ClaimedFoodCard";

/*
========================================
CLAIMED FOOD PAGE
========================================
*/

const ClaimedFood = () => {

  /*
  ========================================
  QUERY
  ========================================
  */

  const {
    data: foods = [],
    isLoading,
  } = useQuery({
    queryKey: ["claimed-food"],
    queryFn: getClaimedFood,
  });

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

  /*
  ========================================
  EMPTY STATE
  ========================================
  */

  if (foods.length === 0) {

    return (
      <DashboardLayout>

        <EmptyState
          title="No Claimed Food"
          description="Claimed food deliveries will appear here."
        />

      </DashboardLayout>
    );
  }

  /*
  ========================================
  MAIN UI
  ========================================
  */

  return (

    <DashboardLayout>

      {/* ========================================
          PAGE HEADER
      ======================================== */}

      <PageHeader
        title="Claimed Food"
        description="Track claimed food deliveries and logistics."
        action={

          <div
            className="
              bg-white
              rounded-2xl
              shadow-md
              border
              border-gray-100
              px-6
              py-4
              min-w-[160px]
            "
          >

            <p
              className="
                text-sm
                font-medium
                text-gray-500
              "
            >
              Total Claimed
            </p>

            <h2
              className="
                text-4xl
                font-extrabold
                text-orange-500
                mt-1
              "
            >
              {foods.length}
            </h2>

          </div>
        }
      />

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

        {foods.map((food) => (

          <ClaimedFoodCard
            key={food._id}
            food={food}
          />
        ))}

      </div>

    </DashboardLayout>
  );
};

export default ClaimedFood;