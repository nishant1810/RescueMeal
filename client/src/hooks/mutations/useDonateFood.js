import {

  useMutation,

  useQueryClient,

} from "@tanstack/react-query";

import toast from "react-hot-toast";

/*
========================================
SERVICES
========================================
*/

import {
  donateFood,
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
USE DONATE FOOD
========================================
*/

const useDonateFood =
  () => {

    const queryClient =
      useQueryClient();

    return useMutation({

      /*
      ========================================
      MUTATION FUNCTION
      ========================================
      */

      mutationFn:
        donateFood,

      /*
      ========================================
      SUCCESS
      ========================================
      */

      onSuccess: () => {

        toast.success(
          "Food donated successfully"
        );

        /*
        ========================================
        INVALIDATE FOODS
        ========================================
        */

        queryClient.invalidateQueries({

          queryKey: [
            QUERY_KEYS.FOODS,
          ],
        });

        /*
        ========================================
        INVALIDATE DONATIONS
        ========================================
        */

        queryClient.invalidateQueries({

          queryKey: [
            QUERY_KEYS.MY_DONATIONS,
          ],
        });

        /*
        ========================================
        INVALIDATE DASHBOARD
        ========================================
        */

        queryClient.invalidateQueries({

          queryKey: [
            QUERY_KEYS.DASHBOARD_STATS,
          ],
        });
      },

      /*
      ========================================
      ERROR
      ========================================
      */

      onError:
        (error) => {

          toast.error(

            error?.response
              ?.data
              ?.message ||

            "Donation failed"
          );
        },
    });
  };

export default useDonateFood;