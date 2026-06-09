import React from "react";

import {
  Link,
} from "react-router-dom";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  Package,
} from "lucide-react";

/*
========================================
LAYOUT
========================================
*/

import DashboardLayout from "../../layouts/DashboardLayout.jsx";

/*
========================================
SERVICES
========================================
*/

import {
  getMyDonations,
} from "../../services/food.service.js";

/*
========================================
UI COMPONENTS
========================================
*/

import Loader from "../../components/ui/Loader.jsx";

import EmptyState from "../../components/ui/EmptyState.jsx";

import PageHeader from "../../components/ui/PageHeader.jsx";

import Button from "../../components/ui/Button.jsx";

import Table from "../../components/ui/Table.jsx";

import SectionCard from "../../components/dashboard/SectionCard.jsx";

/*
========================================
DONATION COMPONENTS
========================================
*/

import DonationTableRow from "../../components/donations/DonationTableRow.jsx";

/*
========================================
MY DONATIONS
========================================
*/

const MyDonations =
  () => {

    /*
    ========================================
    QUERY
    ========================================
    */

    const {

      data:
        foods = [],

      isLoading,

      error,

    } = useQuery({

      queryKey: [
        "my-donations",
      ],

      queryFn:
        getMyDonations,
    });

    /*
    ========================================
    LOADING
    ========================================
    */

    if (isLoading) {

      return (

        <DashboardLayout>

          <Loader
            fullScreen
            text="Loading donations..."
          />

        </DashboardLayout>
      );
    }

    /*
    ========================================
    ERROR
    ========================================
    */

    if (error) {

      return (

        <DashboardLayout>

          <div

            className="
              flex
              items-center
              justify-center
              min-h-[400px]
            "
          >

            <div className="text-center">

              <h2

                className="
                  text-3xl
                  font-bold
                  text-red-500
                "
              >

                Failed to load donations

              </h2>

              <p

                className="
                  text-gray-500
                  mt-2
                "
              >

                Please try again later.

              </p>

            </div>

          </div>

        </DashboardLayout>
      );
    }

    /*
    ========================================
    TABLE COLUMNS
    ========================================
    */

    const columns = [

      {
        key: "food",
        title: "Food",
      },

      {
        key: "quantity",
        title: "Quantity",
      },

      {
        key: "category",
        title: "Category",
      },

      {
        key: "status",
        title: "Status",
      },

      {
        key: "location",
        title: "Location",
      },

      {
        key: "expiry",
        title: "Expiry",
      },
    ];

    return (

      <DashboardLayout>

        <div

          className="
            max-w-7xl
            mx-auto
            space-y-8
          "
        >

          {/* ========================================
              PAGE HEADER
          ======================================== */}

          <PageHeader

            title="My Donations"

            description="Track and manage your donated food items."

            action={

              <Link
                to="/donor/donate-food"
              >

                <Button>

                  Donate Food

                </Button>

              </Link>
            }
          />

          {/* ========================================
              SUMMARY CARD
          ======================================== */}

          {/* <div

            className="
              bg-gradient-to-r
              from-orange-500
              to-amber-400

              rounded-3xl

              shadow-xl

              px-8
              py-8

              text-white
            "
          > */}

            {/* <div

              className="
                flex
                items-center
                justify-between
              "
            > */}

              {/* <div>

                <p

                  className="
                    text-orange-100
                    text-sm
                    uppercase
                    tracking-wide
                  "
                >

                  Total Donations

                </p>

                <h2

                  className="
                    text-5xl
                    font-extrabold
                    mt-3
                  "
                >

                  {foods.length}

                </h2>

              </div> */}

              {/* <div

                className="
                  w-20
                  h-20

                  rounded-2xl

                  bg-white/20

                  flex
                  items-center
                  justify-center
                "
              >

                <Package size={38} />

              </div> */}

            {/* </div> */}

          {/* </div> */}

          {/* ========================================
              EMPTY STATE
          ======================================== */}

          {foods.length === 0 ? (

            <SectionCard title="Donations">

              <EmptyState

                title="No Donations Yet"

                description="Start donating food to help communities."

                action={

                  <Link
                    to="/donor/donate-food"
                  >

                    <Button>

                      Donate Food

                    </Button>

                  </Link>
                }
              />

            </SectionCard>

          ) : (

            /* ========================================
                TABLE
            ======================================== */

            <SectionCard
              title="Donation History"
            >

              <Table

                columns={columns}

                data={foods}

                renderRow={(food) => (

                  <DonationTableRow

                    key={food._id}

                    food={food}
                  />
                )}
              />

            </SectionCard>
          )}

        </div>

      </DashboardLayout>
    );
  };

export default MyDonations;