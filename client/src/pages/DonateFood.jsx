import React, {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast
from "react-hot-toast";

import Navbar
from "../components/layout/Navbar";

import {
  donateFood,
} from "../services/food.service";

const DonateFood = () => {

  /*
  ========================================
  NAVIGATION
  ========================================
  */

  const navigate =
    useNavigate();

  /*
  ========================================
  STATE
  ========================================
  */

  const [formData, setFormData] =
    useState({
      foodName: "",
      quantity: "",
      category: "",
      location: "",
      expiryTime: "",
      description: "",
      foodImage: "",

      /*
      ========================================
      GEO LOCATION
      ========================================
      */

      latitude: "",

      longitude: "",
    });

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /*
  ========================================
  GET USER LOCATION
  ========================================
  */

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      (position) => {

        setFormData(
          (prev) => ({
            ...prev,

            latitude:
              position.coords.latitude,

            longitude:
              position.coords.longitude,
          })
        );
      },

      (error) => {

        console.log(error);

        toast.error(
          "Location access denied"
        );
      }
    );

  }, []);

  /*
  ========================================
  CLEANUP PREVIEW
  ========================================
  */

  useEffect(() => {

    return () => {

      if (preview) {

        URL.revokeObjectURL(
          preview
        );
      }
    };

  }, [preview]);

  /*
  ========================================
  HANDLE CHANGE
  ========================================
  */

  const handleChange =
    (e) => {

      const {
        name,
        value,
      } = e.target;

      setFormData(
        (prev) => ({
          ...prev,

          [name]: value,
        })
      );
    };

  /*
  ========================================
  IMAGE CHANGE
  ========================================
  */

  const handleImageChange =
    (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      /*
      ========================================
      VALIDATE IMAGE
      ========================================
      */

      if (
        !file.type.startsWith(
          "image/"
        )
      ) {

        return toast.error(
          "Please upload a valid image"
        );
      }

      /*
      ========================================
      VALIDATE SIZE
      ========================================
      */

      if (
        file.size >
        5 * 1024 * 1024
      ) {

        return toast.error(
          "Image must be less than 5MB"
        );
      }

      /*
      ========================================
      UPDATE STATE
      ========================================
      */

      setFormData(
        (prev) => ({
          ...prev,

          foodImage: file,
        })
      );

      /*
      ========================================
      IMAGE PREVIEW
      ========================================
      */

      const imagePreview =
        URL.createObjectURL(
          file
        );

      setPreview(
        imagePreview
      );
    };

  /*
  ========================================
  HANDLE SUBMIT
  ========================================
  */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        /*
        ========================================
        VALIDATION
        ========================================
        */

        if (
          !formData.foodName ||
          !formData.quantity ||
          !formData.category ||
          !formData.location ||
          !formData.expiryTime
        ) {

          return toast.error(
            "Please fill all required fields"
          );
        }

        setLoading(true);

        /*
        ========================================
        CREATE FORM DATA
        ========================================
        */

        const submitData =
          new FormData();

        Object.keys(
          formData
        ).forEach((key) => {

          if (
            formData[key] !==
            null
          ) {

            submitData.append(
              key,
              formData[key]
            );
          }
        });

        /*
        ========================================
        API CALL
        ========================================
        */

        await donateFood(
          submitData
        );

        /*
        ========================================
        SUCCESS
        ========================================
        */

        toast.success(
          "Food Donated Successfully"
        );

        /*
        ========================================
        RESET FORM
        ========================================
        */

        setFormData({
          foodName: "",
          quantity: "",
          category: "",
          location: "",
          expiryTime: "",
          description: "",
          foodImage: "",

          latitude:
            formData.latitude,

          longitude:
            formData.longitude,
        });

        setPreview("");

        /*
        ========================================
        REDIRECT
        ========================================
        */

        setTimeout(() => {

          navigate(
            "/my-donations"
          );

        }, 1000);

      } catch (error) {

        console.log(error);

        toast.error(
          error.response?.data
            ?.message ||
            "Donation Failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <>
      {/* ========================================
          NAVBAR
      ======================================== */}

      <Navbar />

      {/* ========================================
          PAGE
      ======================================== */}

      <div
        className="
          min-h-screen
          bg-gradient-to-br
          from-slate-50
          via-orange-50
          to-blue-50
          text-gray-900
          px-4
          py-10
        "
      >
        {/* ========================================
            CONTAINER
        ======================================== */}

        <div
          className="
            max-w-4xl
            mx-auto
          "
        >
          {/* ========================================
              CARD
          ======================================== */}

          <div
            className="
              bg-white
              rounded-3xl
              shadow-2xl
              p-8
              md:p-10
            "
          >
            {/* ========================================
                HEADER
            ======================================== */}

            <div
              className="
                mb-10
              "
            >
              <h1
                className="
                  text-5xl
                  font-bold
                  mb-3
                "
              >
                Donate Food
              </h1>

              <p
                className="
                  text-gray-600
                  text-lg
                "
              >
                Help reduce food waste
                and support communities.
              </p>
            </div>

            {/* ========================================
                FORM
            ======================================== */}

            <form
              onSubmit={
                handleSubmit
              }

              className="
                space-y-6
              "
            >
              {/* FOOD NAME */}

              <input
                type="text"
                name="foodName"
                placeholder="Food Name"
                value={
                  formData.foodName
                }
                onChange={
                  handleChange
                }

                className="
                  w-full
                  bg-gray-100
                  border
                  border-gray-300
                  p-4
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

              {/* QUANTITY */}

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={
                  formData.quantity
                }
                onChange={
                  handleChange
                }

                className="
                  w-full
                  bg-gray-100
                  border
                  border-gray-300
                  p-4
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

              {/* CATEGORY */}

              <select
                name="category"
                value={
                  formData.category
                }
                onChange={
                  handleChange
                }

                className="
                  w-full
                  bg-gray-100
                  border
                  border-gray-300
                  p-4
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              >
                <option value="">
                  Select Category
                </option>

                <option value="veg">
                  Veg
                </option>

                <option value="non-veg">
                  Non-Veg
                </option>

                <option value="packed food">
                  Packed Food
                </option>

                <option value="bakery">
                  Bakery
                </option>
              </select>

              {/* LOCATION */}

              <input
                type="text"
                name="location"
                placeholder="Pickup Location"
                value={
                  formData.location
                }
                onChange={
                  handleChange
                }

                className="
                  w-full
                  bg-gray-100
                  border
                  border-gray-300
                  p-4
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

              {/* EXPIRY */}

              <input
                type="datetime-local"
                name="expiryTime"
                value={
                  formData.expiryTime
                }
                onChange={
                  handleChange
                }

                className="
                  w-full
                  bg-gray-100
                  border
                  border-gray-300
                  p-4
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

              {/* DESCRIPTION */}

              <textarea
                name="description"
                placeholder="Description"
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }

                className="
                  w-full
                  h-32
                  bg-gray-100
                  border
                  border-gray-300
                  p-4
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

              {/* IMAGE */}

              <div>
                <input
                  id="foodImage"
                  type="file"
                  accept="image/*"
                  onChange={
                    handleImageChange
                  }

                  className="
                    w-full
                    bg-gray-100
                    border
                    border-gray-300
                    p-4
                    rounded-xl
                  "
                />

                {/* PREVIEW */}

                {preview && (

                  <img
                    src={preview}
                    alt="preview"

                    className="
                      mt-5
                      w-full
                      h-72
                      object-cover
                      rounded-2xl
                      shadow-lg
                    "
                  />
                )}
              </div>

              {/* SUBMIT */}

              <button
                type="submit"

                disabled={loading}

                className="
                  w-full
                  bg-blue-500
                  hover:bg-blue-600
                  disabled:bg-gray-500
                  text-white
                  py-4
                  rounded-xl
                  text-lg
                  font-semibold
                  transition
                  duration-300
                "
              >
                {loading
                  ? "Submitting..."
                  : "Donate Food"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonateFood;