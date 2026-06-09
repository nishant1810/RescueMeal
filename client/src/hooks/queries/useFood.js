import {
  useQuery,
} from "@tanstack/react-query";

/*
========================================
SERVICES
========================================
*/

import {
  getAllFoodService,
} from "../../services/food.service.js";

/*
========================================
QUERY KEYS
========================================
*/

import {
  QUERY_KEYS,
} from "../../constants/queryKeys.js";

/*
========================================
USE FOODS
========================================
*/

const useFoods =
  (

    page = 1,

    limit = 6
  ) => {

    return useQuery({

      queryKey: [

        QUERY_KEYS.FOODS,

        page,

        limit,
      ],

      queryFn:
        () =>
          getAllFoodService(

            page,

            limit
          ),

      keepPreviousData:
        true,
    });
  };

export default useFoods;