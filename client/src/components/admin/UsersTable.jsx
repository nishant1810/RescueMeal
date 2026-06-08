import React from "react";

import {
  Trash2,
} from "lucide-react";

/*
========================================
BUTTON
========================================
*/

import Button
from "../ui/Button";

/*
========================================
USERS TABLE
========================================
*/

const UsersTable =
  ({

    users,

    onDelete,
  }) => {

    return (

      <div

        className="

          overflow-x-auto

          bg-white

          rounded-3xl

          shadow-sm

          border

          border-gray-100
        "
      >

        <table className="w-full">

          <thead>

            <tr

              className="

                border-b

                border-gray-100

                bg-gray-50
              "
            >

              <th className="px-6 py-4 text-left">

                Name

              </th>

              <th className="px-6 py-4 text-left">

                Email

              </th>

              <th className="px-6 py-4 text-left">

                Role

              </th>

              <th className="px-6 py-4 text-left">

                Action

              </th>

            </tr>

          </thead>

          <tbody>

            {users.map(
              (user) => (

                <tr

                  key={user._id}

                  className="border-b"
                >

                  <td className="px-6 py-4">

                    {user.name}

                  </td>

                  <td className="px-6 py-4">

                    {user.email}

                  </td>

                  <td className="px-6 py-4 capitalize">

                    {user.role}

                  </td>

                  <td className="px-6 py-4">

                    <Button

                      size="sm"

                      variant="danger"

                      onClick={() =>

                        onDelete(
                          user._id
                        )
                      }
                    >

                      <Trash2 size={16} />

                    </Button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>
    );
  };

export default UsersTable;