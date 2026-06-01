import Food from "../models/food.js";

export const createFoodDonation = async (
  data
) => {
  return await Food.create(data);
};

export const getAvailableFood = async () => {
  return await Food.find({
    status: "available",
  })
    .populate("donor", "name email")
    .sort({ createdAt: -1 });
};