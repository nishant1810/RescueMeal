import React
from "react";

/*
========================================
COMPONENTS
========================================
*/

import Navbar
from "../components/layout/Navbar.jsx";

/*
========================================
MAIN LAYOUT
========================================
*/

const MainLayout =
  ({ children }) => {

    return (

      <div

        className="

          min-h-screen

          bg-gradient-to-br

          from-slate-50

          via-orange-50

          to-blue-50
        "
      >

        {/* NAVBAR */}

        <Navbar />

        {/* CONTENT */}

        <main>

          {children}

        </main>

      </div>
    );
  };

export default
MainLayout;