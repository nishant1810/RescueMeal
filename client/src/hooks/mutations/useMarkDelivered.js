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
  markDelivered,
} from "../../services/food.service.js";

/*
========================================
USE MARK DELIVERED
========================================
*/

const useMarkDelivered =
  () => {

    const queryClient =
      useQueryClient();

    return useMutation({

      mutationFn:
        markDelivered,

      onSuccess: () => {

        toast.success(
          "Delivery marked as completed"
        );

        /*
        ========================================
        INVALIDATE
        ========================================
        */

        queryClient.invalidateQueries({

          queryKey:
            ["volunteer-deliveries"],
        });

        queryClient.invalidateQueries({

          queryKey:
            ["dashboard-stats"],
        });
      },

      onError: (error) => {

        toast.error(

          error?.response?.data
            ?.message ||

          "Failed to update delivery"
        );
      },
    });
  };

export default useMarkDelivered;