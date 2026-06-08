import {
  useQuery,
} from "@tanstack/react-query";

/*
========================================
SERVICES
========================================
*/

import {
  getDashboardStatsService,
} from "../../services/food.service";

/*
========================================
QUERY KEYS
========================================
*/

import {
  QUERY_KEYS,
} from "../../constants/queryKeys";

/*
========================================
USE DASHBOARD STATS
========================================
*/

const useDashboardStats =
  () => {

    return useQuery({

      queryKey: [
        QUERY_KEYS.DASHBOARD_STATS,
      ],

      queryFn:
        getDashboardStatsService,
    });
  };

export default useDashboardStats;