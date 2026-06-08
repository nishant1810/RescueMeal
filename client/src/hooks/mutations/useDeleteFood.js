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
  deleteFood,
} from "../../services/food.service";

/*
========================================
USE DELETE FOOD
========================================
*/

const useDeleteFood =
  () => {

    const queryClient =
      useQueryClient();

    return useMutation({

      mutationFn:
        deleteFood,

      onSuccess: () => {

        toast.success(
          "Donation deleted successfully"
        );

        /*
        ========================================
        INVALIDATE
        ========================================
        */

        queryClient.invalidateQueries({

          queryKey:
            ["my-donations"],
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

          "Failed to delete donation"
        );
      },
    });
  };

export default useDeleteFood;