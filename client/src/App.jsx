import React from "react";

/*
========================================
ROUTES
========================================
*/

import AppRoutes from "./routes/AppRoutes";

/*
========================================
SOCKETS
========================================
*/

import useRealtimeUpdates from "./hooks/socket/useRealtimeUpdates";

/*
========================================
APP
========================================
*/

const App = () => {

  /*
  ========================================
  REALTIME SOCKET
  ========================================
  */

  useRealtimeUpdates();

  return <AppRoutes />;
};

export default App;