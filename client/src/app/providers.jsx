import React from "react";

import {

  QueryClient,

  QueryClientProvider,
} from "@tanstack/react-query";

/*
========================================
AUTH PROVIDER
========================================
*/

import {
  AuthProvider,
} from "../context/AuthContext.jsx";

/*
========================================
SOCKET PROVIDER
========================================
*/

import {
  SocketProvider,
} from "../context/SocketContext.jsx";

/*
========================================
NOTIFICATION PROVIDER
========================================
*/

import {
  NotificationProvider,
} from "../context/NotificationContext.jsx";

/*
========================================
QUERY CLIENT
========================================
*/

const queryClient =
  new QueryClient({

    defaultOptions: {

      queries: {

        /*
        ========================================
        CACHE TIME
        ========================================
        */

        staleTime:
          1000 * 60 * 5,

        /*
        ========================================
        RETRY FAILED REQUESTS
        ========================================
        */

        retry: 1,

        /*
        ========================================
        DISABLE AUTO REFETCH
        ========================================
        */

        refetchOnWindowFocus:
          false,

        /*
        ========================================
        GARBAGE COLLECTION
        ========================================
        */

        gcTime:
          1000 * 60 * 10,
      },

      mutations: {

        retry: 1,
      },
    },
  });

/*
========================================
GLOBAL PROVIDERS
========================================
*/

const Providers =
  ({ children }) => {

    return (

      <QueryClientProvider
        client={queryClient}
      >

        <AuthProvider>

          <SocketProvider>

            <NotificationProvider>

              {children}

            </NotificationProvider>

          </SocketProvider>

        </AuthProvider>

      </QueryClientProvider>
    );
  };

export default Providers;