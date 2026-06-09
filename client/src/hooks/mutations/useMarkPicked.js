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
  markPicked,
} from "../../services/delivery.service.js";

/*
========================================
USE MARK PICKED
========================================
*/

const useMarkPicked =
  () => {

    const queryClient =
      useQueryClient();

    return useMutation({

      mutationFn:
        markPicked,

      onSuccess: () => {

        toast.success(
          "Food Picked"
        );

        queryClient.invalidateQueries({

          queryKey:
            ["deliveries"],
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

export default useMarkPicked;