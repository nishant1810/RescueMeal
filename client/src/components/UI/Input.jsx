import React from "react";

/*
========================================
INPUT
========================================
*/

const Input =
  ({

    label,

    error = "",

    helperText = "",

    required = false,

    disabled = false,

    className = "",

    ...props
  }) => {

    return (

      <div className="w-full space-y-2">

        {/* ========================================
            LABEL
        ======================================== */}

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

        {/* ========================================
            INPUT
        ======================================== */}

        <input

          disabled={disabled}

          className={`

            w-full

            px-4

            py-3

            rounded-xl

            border

            bg-white

            text-gray-800

            placeholder:text-gray-400

            outline-none

            transition-all

            duration-200

            focus:ring-2

            focus:ring-orange-400

            focus:border-orange-400

            disabled:bg-gray-100

            disabled:cursor-not-allowed

            disabled:opacity-70

            ${
              error

                ? `
                  border-red-500
                  focus:ring-red-300
                  focus:border-red-500
                `

                : "border-gray-300"
            }

            ${className}
          `}

          {...props}
        />

        {/* ========================================
            HELPER TEXT
        ======================================== */}

        {!error && helperText && (

          <p

            className="

              text-sm

              text-gray-500
            "
          >

            {helperText}

          </p>
        )}

        {/* ========================================
            ERROR
        ======================================== */}

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

export default Input;