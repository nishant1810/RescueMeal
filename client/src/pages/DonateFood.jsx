import React, {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  donateFood,
} from "../services/foodService";

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

      foodImage: null,
    });

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

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
  HANDLE INPUT CHANGE
  ========================================
  */

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  /*
  ========================================
  HANDLE IMAGE CHANGE
  ========================================
  */

  const handleImageChange = (
    e
  ) => {
    const file =
      e.target.files[0];

    if (!file) return;

    /*
    ========================================
    VALIDATE TYPE
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
        "Image size must be less than 5MB"
      );
    }

    /*
    ========================================
    UPDATE STATE
    ========================================
    */

    setFormData((prev) => ({
      ...prev,

      foodImage: file,
    }));

    /*
    ========================================
    REMOVE OLD PREVIEW
    ========================================
    */

    if (preview) {
      URL.revokeObjectURL(
        preview
      );
    }

    /*
    ========================================
    CREATE PREVIEW
    ========================================
    */

    const imagePreview =
      URL.createObjectURL(file);

    setPreview(imagePreview);
  };

  /*
  ========================================
  HANDLE SUBMIT
  ========================================
  */

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      /*
      ========================================
      VALIDATION
      ========================================
      */

      if (
        !formData.foodName.trim() ||
        !formData.quantity ||
        !formData.category ||
        !formData.location.trim() ||
        !formData.expiryTime
      ) {
        return toast.error(
          "Please fill all required fields"
        );
      }

      /*
      ========================================
      QUANTITY VALIDATION
      ========================================
      */

      if (
        Number(
          formData.quantity
        ) <= 0
      ) {
        return toast.error(
          "Quantity must be greater than 0"
        );
      }

      /*
      ========================================
      EXPIRY VALIDATION
      ========================================
      */

      const currentTime =
        new Date();

      const expiryDate =
        new Date(
          formData.expiryTime
        );

      if (
        expiryDate <=
        currentTime
      ) {
        return toast.error(
          "Expiry time must be in the future"
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

      submitData.append(
        "foodName",
        formData.foodName
      );

      submitData.append(
        "quantity",
        formData.quantity
      );

      submitData.append(
        "category",
        formData.category
      );

      submitData.append(
        "location",
        formData.location
      );

      submitData.append(
        "expiryTime",
        formData.expiryTime
      );

      submitData.append(
        "description",
        formData.description
      );

      /*
      ========================================
      IMAGE
      ========================================
      */

      if (
        formData.foodImage
      ) {
        submitData.append(
          "foodImage",
          formData.foodImage
        );
      }

      /*
      ========================================
      API CALL
      ========================================
      */

      const response =
        await donateFood(
          submitData
        );

      console.log(
        "Donation Response:",
        response
      );

      /*
      ========================================
      SUCCESS
      ========================================
      */

      toast.success(
        "Food donated successfully"
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

        foodImage: null,
      });

      /*
      ========================================
      RESET PREVIEW
      ========================================
      */

      if (preview) {
        URL.revokeObjectURL(
          preview
        );
      }

      setPreview("");

      /*
      ========================================
      RESET FILE INPUT
      ========================================
      */

      const fileInput =
        document.getElementById(
          "foodImage"
        );

      if (fileInput) {
        fileInput.value = "";
      }

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
          "Donation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div
        className="
        min-h-screen
        bg-gray-100
        p-4
        md:p-6
      "
      >
        <div
          className="
          max-w-4xl
          mx-auto
        "
        >
          <div
            className="
            bg-white
            rounded-3xl
            shadow-xl
            p-6
            md:p-10
          "
          >
            {/* HEADER */}

            <div className="mb-8">
              <h1
                className="
                text-4xl
                md:text-5xl
                font-bold
                mb-2
              "
              >
                Donate Food
              </h1>

              <p
                className="
                text-gray-500
                text-lg
              "
              >
                Help reduce food waste
                and support communities.
              </p>
            </div>

            {/* FORM */}

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
                value={
                  formData.foodName
                }
                placeholder="Food Name"
                onChange={
                  handleChange
                }
                className="
                w-full
                border
                border-gray-300
                p-4
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
              "
              />

              {/* QUANTITY */}

              <input
                type="number"
                name="quantity"
                value={
                  formData.quantity
                }
                placeholder="Quantity"
                onChange={
                  handleChange
                }
                className="
                w-full
                border
                border-gray-300
                p-4
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
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
                border
                border-gray-300
                p-4
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
              "
              >
                <option value="">
                  Select Category
                </option>

                <option value="Veg">
                  Veg
                </option>

                <option value="Non-Veg">
                  Non-Veg
                </option>

                <option value="Packed Food">
                  Packed Food
                </option>

                <option value="Bakery">
                  Bakery
                </option>
              </select>

              {/* LOCATION */}

              <input
                type="text"
                name="location"
                value={
                  formData.location
                }
                placeholder="Pickup Location"
                onChange={
                  handleChange
                }
                className="
                w-full
                border
                border-gray-300
                p-4
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
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
                border
                border-gray-300
                p-4
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
              "
              />

              {/* DESCRIPTION */}

              <textarea
                name="description"
                value={
                  formData.description
                }
                placeholder="Description"
                onChange={
                  handleChange
                }
                className="
                w-full
                border
                border-gray-300
                p-4
                rounded-xl
                h-32
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
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
                    mt-4
                    w-full
                    h-72
                    object-cover
                    rounded-2xl
                    shadow-md
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
                bg-green-500
                hover:bg-green-600
                disabled:bg-gray-400
                text-white
                py-4
                rounded-xl
                text-lg
                font-semibold
                transition
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
    </DashboardLayout>
  );
};

export default DonateFood;