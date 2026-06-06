import React
from "react";

/*
========================================
INPUT
========================================
*/

const Input =
  ({
    label,

    error,

    className = "",

    ...props
  }) => {

    return (

      <div
        className="w-full"
      >

        {/* LABEL */}

        {label && (

          <label

            className="

              block

              mb-2

              font-medium

              text-gray-700
            "
          >

            {label}

          </label>
        )}

        {/* INPUT */}

        <input

          className={`

            w-full

            px-4

            py-3

            border

            rounded-lg

            outline-none

            transition

            duration-200

            focus:ring-2

            focus:ring-orange-400

            ${

              error

                ? "border-red-500"

                : "border-gray-300"
            }

            ${className}
          `}

          {...props}
        />

        {/* ERROR */}

        {error && (

          <p

            className="

              mt-1

              text-sm

              text-red-500
            "
          >

            {error}

          </p>
        )}

      </div>
    );
  };

export default
Input;