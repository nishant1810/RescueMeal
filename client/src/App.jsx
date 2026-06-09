import React from "react";

/*
========================================
ROUTES
========================================
*/

import AppRoutes from "./routes/AppRoutes.jsx";

/*
========================================
SOCKETS
========================================
*/

import useRealtimeUpdates from "./hooks/socket/useRealtimeUpdates.js";

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