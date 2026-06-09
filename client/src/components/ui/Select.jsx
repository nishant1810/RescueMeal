import React from "react";

/*
========================================
SELECT
========================================
*/

const Select =
  ({

    label,

    options = [],

    error = "",

    required = false,

    className = "",

    ...props
  }) => {

    return (

      <div className="space-y-2">

        {/* LABEL */}

        {label && (

          <label

            className="
              block
              text-sm
              font-semibold
              text-gray-700
            "
          >

            {label}

            {required && (

              <span
                className="text-red-500"
              >

                {" "}*

              </span>
            )}

          </label>
        )}

        {/* SELECT */}

        <select

          className={`

            w-full
            px-4
            py-3
            rounded-xl
            border
            bg-white
            text-gray-800
            outline-none
            transition-all
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
        >

          {options.map(
            (option) => (

              <option

                key={option.value}

                value={option.value}

                disabled={
                  option.value === ""
                }
              >

                {option.label}

              </option>
            )
          )}

        </select>

        {/* ERROR */}

        {error && (

          <p

            className="
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

export default Select;