import React from "react";

import {
  Search,
} from "lucide-react";

/*
========================================
SEARCH BAR
========================================
*/

const SearchBar =
  ({

    value,

    onChange,

    placeholder =
      "Search...",
  }) => {

    return (

      <div className="relative">

        <Search

          size={18}

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

          value={value}

          onChange={onChange}

          placeholder={placeholder}

          className="

            w-full

            pl-11

            pr-4

            py-3

            rounded-2xl

            border

            border-gray-200

            bg-white

            shadow-sm

            outline-none

            focus:ring-2

            focus:ring-orange-400
          "
        />

      </div>
    );
  };

export default SearchBar;