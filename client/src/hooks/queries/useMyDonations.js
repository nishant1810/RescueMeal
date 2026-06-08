import {
  useQuery,
} from "@tanstack/react-query";

/*
========================================
SERVICES
========================================
*/

import {
  getMyDonationsService,
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
USE MY DONATIONS
========================================
*/

const useMyDonations =
  () => {

    return useQuery({

      queryKey: [
        QUERY_KEYS.MY_DONATIONS,
      ],

      queryFn:
        getMyDonationsService,
    });
  };

export default useMyDonations;