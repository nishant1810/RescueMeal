import React from "react";

/*
========================================
TEXTAREA
========================================
*/

const Textarea =
  ({

    label,

    placeholder = "",

    value,

    onChange,

    rows = 5,

    error = "",

    required = false,
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

        {/* TEXTAREA */}

        <textarea

          rows={rows}

          placeholder={placeholder}

          value={value}

          onChange={onChange}

          className={`

            w-full

            px-4

            py-3

            rounded-xl

            border

            transition-all

            duration-200

            focus:outline-none

            focus:ring-2

            focus:ring-orange-400

            resize-none

            ${
              error

                ? "border-red-500"

                : "border-gray-200"
            }
          `}
        />

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

export default Textarea;