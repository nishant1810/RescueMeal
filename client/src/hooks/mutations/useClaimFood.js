import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast
from "react-hot-toast";

/*
========================================
SERVICES
========================================
*/

import {
  claimFood,
} from "../../services/food.service";

/*
========================================
USE CLAIM FOOD
========================================
*/

const useClaimFood = () => {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: claimFood,

    /*
    ========================================
    SUCCESS
    ========================================
    */

    onSuccess: () => {

      toast.success(
        "Food claimed successfully"
      );

      /*
      ========================================
      INVALIDATE QUERIES
      ========================================
      */

      queryClient.invalidateQueries({

        queryKey: [
          "available-food",
        ],
      });

      queryClient.invalidateQueries({

        queryKey: [
          "claimed-food",
        ],
      });

      queryClient.invalidateQueries({

        queryKey: [
          "dashboard-stats",
        ],
      });
    },

    /*
    ========================================
    ERROR
    ========================================
    */

    onError: (error) => {

      /*
      ========================================
      PREVENT DUPLICATE TOASTS
      ========================================
      */

      console.error(
        "Claim Food Error:",
        error
      );

      /*
      ========================================
      SHOW ONLY ONE ERROR
      ========================================
      */

      if (
        error?.response?.data
          ?.message
      ) {

        toast.error(

          error.response.data
            .message
        );

      } else {

        toast.error(
          "Failed to claim food"
        );
      }
    },
  });
};

export default useClaimFood;