import React from "react";

/*
========================================
TABLE
========================================
*/

const Table =
  ({

    columns = [],

    data = [],

    renderRow,

    emptyMessage =
      "No data found",
  }) => {

    return (

      <div

        className="

          overflow-x-auto

          rounded-2xl

          border

          border-gray-100

          bg-white

          shadow-sm
        "
      >

        <table

          className="

            min-w-full

            divide-y

            divide-gray-200
          "
        >

          {/* ========================================
              HEADER
          ======================================== */}

          <thead

            className="
              bg-gray-50
            "
          >

            <tr>

              {columns.map(
                (column) => (

                  <th

                    key={column.key}

                    className="

                      px-6

                      py-4

                      text-left

                      text-sm

                      font-semibold

                      text-gray-700
                    "
                  >

                    {column.title}

                  </th>
                )
              )}

            </tr>

          </thead>

          {/* ========================================
              BODY
          ======================================== */}

          <tbody

            className="
              divide-y
              divide-gray-100
            "
          >

            {data.length > 0 ? (

              data.map(
                renderRow
              )

            ) : (

              <tr>

                <td

                  colSpan={
                    columns.length
                  }

                  className="

                    px-6

                    py-10

                    text-center

                    text-gray-500
                  "
                >

                  {emptyMessage}

                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>
    );
  };

export default Table;