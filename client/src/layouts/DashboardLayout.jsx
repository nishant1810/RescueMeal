import React,
{
  useState,
} from "react";

/*
========================================
LAYOUT COMPONENTS
========================================
*/

import Navbar
from "../components/layout/Navbar.jsx";

import Sidebar
from "../components/layout/Sidebar.jsx";

import MobileSidebar
from "../components/layout/MobileSidebar.jsx";

/*
========================================
DASHBOARD LAYOUT
========================================
*/

const DashboardLayout =
  ({ children }) => {

    /*
    ========================================
    SIDEBAR STATE
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

          bg-slate-50
        "
      >

        {/* ========================================
            DESKTOP SIDEBAR
        ======================================== */}

        <Sidebar />

        {/* ========================================
            MOBILE SIDEBAR
        ======================================== */}

        <MobileSidebar

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

            lg:ml-72

            min-h-screen

            flex

            flex-col
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

              px-4

              sm:px-6

              lg:px-8

              py-8
            "
          >

            {children}

          </main>

        </div>

      </div>
    );
  };

export default DashboardLayout;