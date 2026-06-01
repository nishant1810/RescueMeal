import React from "react";
import socket from "../socket";
import {
  useEffect,
  useState,
} from "react";

import FoodCard from "../components/FoodCard";

import {
  getAllFood,
} from "../services/foodService";

const AvailableFood = () => {
  const [foods, setFoods] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const fetchFood =
    async () => {
      try {
        const data =
          await getAllFood();

        setFoods(data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
  fetchFood();

  socket.on(
    "newFoodDonation",
    (data) => {
      fetchFood();

      alert(data.message);
    }
  );

  return () => {
    socket.off(
      "newFoodDonation"
    );
  };
}, []);

  return (
    <div
      className="
      p-6
    "
    >
      <div
        className="
        flex
        justify-between
        items-center
        mb-8
      "
      >
        <h1
          className="
          text-4xl
          font-bold
        "
        >
          Available Food
        </h1>

        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
          border
          p-3
          rounded-lg
          w-72
        "
        />
      </div>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-8
      "
      >
        {foods
          .filter((food) =>
            food.foodName
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          )
          .map((food) => (
            <FoodCard
              key={food._id}
              food={food}
              refreshFood={
                fetchFood
              }
            />
          ))}
      </div>
    </div>
  );
};

export default AvailableFood;