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
  acceptDelivery,
} from "../../services/delivery.service";

/*
========================================
USE ACCEPT DELIVERY
========================================
*/

const useAcceptDelivery =
  () => {

    const queryClient =
      useQueryClient();

    return useMutation({

      mutationFn:
        acceptDelivery,

      onSuccess: () => {

        toast.success(
          "Delivery Accepted"
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

          "Failed to accept delivery"
        );
      },
    });
  };

export default useAcceptDelivery;