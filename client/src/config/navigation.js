import {

  LayoutDashboard,

  HeartHandshake,

  Package,

  Utensils,

  CheckCircle,

  Truck,

  Shield,

} from "lucide-react";

/*
========================================
ROLES
========================================
*/

import {
  ROLES,
} from "../constants/roles.js";

/*
========================================
NAVIGATION CONFIG
========================================
*/

export const navigationConfig = {

  [ROLES.DONOR]: [

    {
      label: "Dashboard",

      path: "/donor/dashboard",

      icon: LayoutDashboard,
    },

    {
      label: "Donate Food",

      path: "/donor/donate-food",

      icon: HeartHandshake,
    },

    {
      label: "My Donations",

      path: "/donor/my-donations",

      icon: Package,
    },
  ],

  [ROLES.NGO]: [

    {
      label: "Dashboard",

      path: "/ngo/dashboard",

      icon: LayoutDashboard,
    },

    {
      label: "Available Food",

      path: "/ngo/available-food",

      icon: Utensils,
    },

    {
      label: "Claimed Food",

      path: "/ngo/claimed-food",

      icon: CheckCircle,
    },
  ],

  [ROLES.VOLUNTEER]: [

    {
      label: "Dashboard",

      path: "/volunteer/dashboard",

      icon: LayoutDashboard,
    },

    {
      label: "Deliveries",

      path: "/volunteer/deliveries",

      icon: Truck,
    },
  ],

  [ROLES.ADMIN]: [

    {
      label: "Dashboard",

      path: "/admin/dashboard",

      icon: LayoutDashboard,
    },

    {
      label: "Admin Panel",

      path: "/admin/dashboard",

      icon: Shield,
    },
  ],
};