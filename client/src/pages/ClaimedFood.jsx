import React from "react";

import {
  useEffect,
  useState,
} from "react";

import {
  getClaimedFood,
} from "../services/foodService";

const ClaimedFood = () => {
  const [foods, setFoods] =
    useState([]);

  useEffect(() => {
    fetchClaimedFood();
  }, []);

  const fetchClaimedFood =
    async () => {
      try {
        const data =
          await getClaimedFood();

        setFoods(data);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="p-6">
      <h1
        className="
        text-4xl
        font-bold
        mb-8
      "
      >
        Claimed Food
      </h1>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
      "
      >
        {foods.map((food) => (
          <div
            key={food._id}
            className="
            bg-white
            shadow-lg
            rounded-xl
            p-6
          "
          >
            <h2
              className="
              text-2xl
              font-bold
              mb-4
            "
            >
              {food.foodName}
            </h2>

            <p>
              Quantity:
              {" "}
              {food.quantity}
            </p>

            <p>
              Category:
              {" "}
              {food.category}
            </p>

            <p>
              Location:
              {" "}
              {food.location}
            </p>

            <p
              className="
              mt-4
              font-semibold
              text-orange-500
            "
            >
              {food.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClaimedFood;