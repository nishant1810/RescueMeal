import React,
{
  useState,
} from "react";

import Sidebar
from "../components/layout/Sidebar";

import Navbar
from "../components/layout/Navbar";

/*
========================================
DASHBOARD LAYOUT
========================================
*/

const DashboardLayout =
  ({ children }) => {

    /*
    ========================================
    MOBILE SIDEBAR STATE
    ========================================
    */

    const [

      sidebarOpen,

      setSidebarOpen,

    ] = useState(false);

    return (

      <div

        className="

          min-h-screen

          bg-gray-100

          flex
        "
      >

        {/* ========================================
            SIDEBAR
        ======================================== */}

        <Sidebar

          sidebarOpen={
            sidebarOpen
          }

          setSidebarOpen={
            setSidebarOpen
          }
        />

        {/* ========================================
            MAIN CONTENT
        ======================================== */}

        <div

          className="

            flex-1

            flex

            flex-col

            lg:ml-64
          "
        >

          {/* ========================================
              NAVBAR
          ======================================== */}

          <Navbar

            setSidebarOpen={
              setSidebarOpen
            }
          />

          {/* ========================================
              PAGE CONTENT
          ======================================== */}

          <main

            className="

              flex-1

              p-4

              md:p-6

              overflow-y-auto
            "
          >

            {children}

          </main>

        </div>

      </div>
    );
  };

export default
DashboardLayout;