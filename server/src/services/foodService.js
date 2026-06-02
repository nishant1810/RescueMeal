import axios from "axios";

const API =
  "http://localhost:5000/api/v1/food";

/*
========================================
TOKEN
========================================
*/

const getToken = () => {
  return localStorage.getItem(
    "token"
  );
};

/*
========================================
DONATE FOOD
========================================
*/

export const donateFood =
  async (formData) => {
    const response =
      await axios.post(
        `${API}/donate`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

/*
========================================
GET DASHBOARD STATS
========================================
*/

export const getDashboardStats =
  async () => {
    const response =
      await axios.get(
        `${API}/stats`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };

/*
========================================
GET MY DONATIONS
========================================
*/

export const getMyDonations =
  async () => {
    const response =
      await axios.get(
        `${API}/my-donations`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

    return response.data.foods;
  };