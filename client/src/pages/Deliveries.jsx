import React from "react";

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  getVolunteerDeliveries,
  markDelivered,
} from "../services/foodService";

const Deliveries = () => {
  const [foods, setFoods] =
    useState([]);

  const fetchDeliveries =
    async () => {
      try {
        const data =
          await getVolunteerDeliveries();

        setFoods(data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const handleDelivered =
    async (id) => {
      try {
        await markDelivered(
          id
        );

        toast.success(
          "Marked Delivered"
        );

        fetchDeliveries();
      } catch (error) {
        toast.error(
          "Error updating delivery"
        );
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
        Deliveries
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
            rounded-xl
            shadow-lg
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
              Location:
              {" "}
              {food.location}
            </p>

            <p>
              Status:
              {" "}
              {food.status}
            </p>

            <button
              onClick={() =>
                handleDelivered(
                  food._id
                )
              }
              className="
              mt-4
              w-full
              bg-green-500
              hover:bg-green-600
              text-white
              py-3
              rounded-lg
            "
            >
              Mark Delivered
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deliveries;