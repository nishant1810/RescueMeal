import {
  ROLES,
} from "../constants/roles";

/*
========================================
GET DASHBOARD ROUTE
========================================
*/

const getDashboardRoute =
  (role) => {

    switch (role) {

      case ROLES.DONOR:

        return "/donor/dashboard";

      case ROLES.NGO:

        return "/ngo/dashboard";

      case ROLES.VOLUNTEER:

        return "/volunteer/dashboard";

      case ROLES.ADMIN:

        return "/admin/dashboard";

      default:

        return "/";
    }
  };

export default getDashboardRoute;