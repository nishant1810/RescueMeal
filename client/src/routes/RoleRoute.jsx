// import React from "react";

// import {
//   Navigate,
//   useLocation,
// } from "react-router-dom";

// /*
// ========================================
// AUTH CONTEXT
// ========================================
// */

// import {
//   useAuth,
// } from "../context/AuthContext";

// /*
// ========================================
// ROLE ROUTE
// ========================================
// */

// const RoleRoute =
//   ({

//     children,

//     allowedRoles = [],
//   }) => {

//     /*
//     ========================================
//     AUTH CONTEXT
//     ========================================
//     */

//     const {
//       user,
//       loading,
//     } = useAuth();

//     /*
//     ========================================
//     CURRENT LOCATION
//     ========================================
//     */

//     const location =
//       useLocation();

//     /*
//     ========================================
//     LOADING STATE
//     ========================================
//     */

//     if (loading) {

//       return (

//         <div

//           className="
//             min-h-screen
//             flex
//             items-center
//             justify-center
//             bg-gray-50
//           "
//         >

//           <h1

//             className="
//               text-2xl
//               font-bold
//               text-orange-500
//             "
//           >

//             Loading...

//           </h1>

//         </div>
//       );
//     }

//     /*
//     ========================================
//     NO USER
//     ========================================
//     */

//     if (!user) {

//       return (

//         <Navigate

//           to="/login"

//           state={{
//             from: location,
//           }}

//           replace
//         />
//       );
//     }

//     /*
//     ========================================
//     ROLE VALIDATION
//     ========================================
//     */

//     const isAuthorized =

//       allowedRoles.includes(
//         user?.role
//       );

//     /*
//     ========================================
//     UNAUTHORIZED ACCESS
//     ========================================
//     */

//     if (!isAuthorized) {

//       return (

//         <Navigate

//           to="/unauthorized"

//           replace
//         />
//       );
//     }

//     /*
//     ========================================
//     ACCESS GRANTED
//     ========================================
//     */

//     return children;
//   };

// export default RoleRoute;