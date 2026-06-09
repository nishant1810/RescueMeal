import React,
{
  useEffect,
  useState,
} from "react";

import {

  Users,

  Package,

  Truck,

  Building2,

  Activity,
} from "lucide-react";

/*
========================================
LAYOUT
========================================
*/

import DashboardLayout
from "../../layouts/DashboardLayout.jsx";

/*
========================================
SERVICES
========================================
*/

import {
  getAdminStats,
} from "../../services/admin.service.js";

/*
========================================
ADMIN DASHBOARD
========================================
*/

const AdminDashboard =
  () => {

    /*
    ========================================
    STATE
    ========================================
    */

    const [

      stats,

      setStats,

    ] = useState({

      totalUsers: 0,

      totalDonations: 0,

      totalNGOs: 0,

      totalVolunteers: 0,

      totalDelivered: 0,
    });

    const [

      loading,

      setLoading,

    ] = useState(true);

    /*
    ========================================
    FETCH STATS
    ========================================
    */

    useEffect(() => {

      const fetchStats =
        async () => {

          try {

            const response =
              await getAdminStats();

            const data =

              response?.stats ||

              response?.data ||

              {};

            setStats({

              totalUsers:
                data.totalUsers || 0,

              totalDonations:
                data.totalDonations || 0,

              totalNGOs:
                data.totalNGOs || 0,

              totalVolunteers:
                data.totalVolunteers || 0,

              totalDelivered:
                data.totalDelivered || 0,
            });

          } catch (error) {

            console.error(
              "ADMIN ERROR:",
              error
            );

          } finally {

            setLoading(false);
          }
        };

      fetchStats();

    }, []);

    /*
    ========================================
    CARDS
    ========================================
    */

    const cards = [

      {
        title:
          "Total Users",

        value:
          stats.totalUsers,

        icon:
          <Users size={24} />,

        bg:
          "from-blue-500 to-blue-600",
      },

      {
        title:
          "Total Donations",

        value:
          stats.totalDonations,

        icon:
          <Package size={24} />,

        bg:
          "from-orange-500 to-yellow-500",
      },

      {
        title:
          "NGOs",

        value:
          stats.totalNGOs,

        icon:
          <Building2 size={24} />,

        bg:
          "from-green-500 to-green-600",
      },

      {
        title:
          "Volunteers",

        value:
          stats.totalVolunteers,

        icon:
          <Truck size={24} />,

        bg:
          "from-purple-500 to-purple-600",
      },

      {
        title:
          "Delivered",

        value:
          stats.totalDelivered,

        icon:
          <Activity size={24} />,

        bg:
          "from-pink-500 to-red-500",
      },
    ];

    /*
    ========================================
    LOADING
    ========================================
    */

    if (loading) {

      return (

        <DashboardLayout>

          <div

            className="

              h-[70vh]

              flex

              justify-center

              items-center
            "
          >

            <h2

              className="

                text-2xl

                font-semibold

                text-gray-600
              "
            >

              Loading Admin Dashboard...

            </h2>

          </div>

        </DashboardLayout>
      );
    }

    return (

      <DashboardLayout>

        <div
          className="space-y-8"
        >

          {/* HEADER */}

          <div>

            <h1

              className="

                text-4xl

                font-bold

                text-gray-900
              "
            >

              Admin Dashboard

            </h1>

            <p

              className="

                text-gray-500

                mt-2
              "
            >

              Platform monitoring
              and analytics
            </p>

          </div>

          {/* CARDS */}

          <div

            className="

              grid

              grid-cols-1

              sm:grid-cols-2

              xl:grid-cols-5

              gap-6
            "
          >

            {cards.map(

              (

                card,

                index
              ) => (

                <div

                  key={index}

                  className={`

                    bg-gradient-to-r

                    ${card.bg}

                    text-white

                    rounded-2xl

                    p-6

                    shadow-lg
                  `}
                >

                  <div

                    className="

                      flex

                      justify-between

                      items-center

                      mb-5
                    "
                  >

                    <h3

                      className="

                        font-semibold

                        text-lg
                      "
                    >

                      {card.title}

                    </h3>

                    <div

                      className="

                        bg-white/20

                        p-3

                        rounded-xl
                      "
                    >

                      {card.icon}

                    </div>

                  </div>

                  <h2

                    className="

                      text-4xl

                      font-bold
                    "
                  >

                    {card.value}

                  </h2>

                </div>
              )
            )}

          </div>

        </div>

      </DashboardLayout>
    );
  };

export default
AdminDashboard;