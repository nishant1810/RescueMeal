import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } =
    useAuth();

  return (
    <div
      className="
      bg-white
      shadow
      px-6
      py-4
      flex
      justify-between
      items-center
    "
    >
      <div>
        <h2
          className="
          text-xl
          font-semibold
        "
        >
          Welcome, {user?.name}
        </h2>

        <p className="text-gray-500">
  Role:{" "}
  {user?.role === "ngo"
    ? "NGO"
    : user?.role
        ?.charAt(0)
        .toUpperCase() +
      user?.role?.slice(1)}
</p>
      </div>

      <button
        onClick={logout}
        className="
        bg-red-500
        hover:bg-red-600
        text-white
        px-4
        py-2
        rounded-lg
      "
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;