import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast
from "react-hot-toast";

/*
========================================
LAYOUT
========================================
*/

import DashboardLayout from "../../layouts/DashboardLayout.jsx";

/*
========================================
MUTATION
========================================
*/

import useDonateFood from "../../hooks/mutations/useDonateFood.js";

/*
========================================
UI COMPONENTS
========================================
*/

import Card from "../../components/ui/Card.jsx";

import Input from "../../components/ui/Input.jsx";

import Button from "../../components/ui/Button.jsx";

import PageHeader from "../../components/ui/PageHeader.jsx";

/*
========================================
DONATE FOOD
========================================
*/

const DonateFood =
  () => {

    /*
    ========================================
    NAVIGATION
    ========================================
    */

    const navigate =
      useNavigate();

    /*
    ========================================
    MUTATION
    ========================================
    */

    const {

      mutateAsync:
        donateFoodMutation,

      isPending,
    } = useDonateFood();

    /*
    ========================================
    STATE
    ========================================
    */

    const [

      preview,

      setPreview,

    ] = useState("");

    const [

      formData,

      setFormData,

    ] = useState({

      foodName: "",

      quantity: "",

      category: "",

      location: "",

      expiryTime: "",

      description: "",

      foodImage: null,

      latitude: "",

      longitude: "",
    });

    /*
    ========================================
    LOCATION
    ========================================
    */

    useEffect(() => {

      if (
        !navigator.geolocation
      ) {

        return;
      }

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
        }
      );

    }, []);

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

            [name]:
              value,
          })
        );
      };

    /*
    ========================================
    HANDLE IMAGE
    ========================================
    */

    const handleImageChange =
      (e) => {

        const file =
          e.target.files?.[0];

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
            "Upload valid image"
          );
        }

        /*
        ========================================
        SAVE FILE
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
        PREVIEW
        ========================================
        */

        setPreview(
          URL.createObjectURL(
            file
          )
        );
      };

    /*
    ========================================
    SUBMIT
    ========================================
    */

    const handleSubmit =
      async (e) => {

        e.preventDefault();

        try {

          const submitData =
            new FormData();

          Object.entries(
            formData
          ).forEach(

            ([key, value]) => {

              if (

                value !== "" &&

                value !== null

              ) {

                submitData.append(
                  key,
                  value
                );
              }
            }
          );

          /*
          ========================================
          API CALL
          ========================================
          */

          await donateFoodMutation(
            submitData
          );

          toast.success(
            "Food donated successfully"
          );

          navigate(
            "/donor/my-donations"
          );

        } catch (error) {

          toast.error(

            error?.response?.data
              ?.message ||

            "Donation failed"
          );
        }
      };

    return (

      <DashboardLayout>

        {/* PAGE HEADER */}

        <PageHeader

          title="Donate Food"

          description="Help reduce food waste and support communities."
        />

        {/* FORM */}

        <Card>

          <form

            onSubmit={
              handleSubmit
            }

            className="
              space-y-6
            "
          >

            {/* FOOD NAME */}

            <Input

              label="Food Name"

              name="foodName"

              value={
                formData.foodName
              }

              onChange={
                handleChange
              }

              placeholder="Enter food name"

              required
            />

            {/* QUANTITY */}

            <Input

              label="Quantity"

              type="number"

              name="quantity"

              value={
                formData.quantity
              }

              onChange={
                handleChange
              }

              placeholder="Enter quantity"

              required
            />

            {/* CATEGORY */}

            <div>

              <label
                className="
                  block
                  mb-2
                  font-medium
                  text-gray-700
                "
              >

                Category

              </label>

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
                  px-4
                  py-3
                  border
                  border-gray-300
                  rounded-lg
                  outline-none
                  focus:ring-2
                  focus:ring-orange-400
                "
              >

                <option value="">
                  Select Category
                </option>

                <option value="veg">
                  Veg
                </option>

                <option value="non-veg">
                  Non Veg
                </option>

                <option value="packed-food">
                  Packed Food
                </option>

                <option value="bakery">
                  Bakery
                </option>

              </select>

            </div>

            {/* LOCATION */}

            <Input

              label="Pickup Location"

              name="location"

              value={
                formData.location
              }

              onChange={
                handleChange
              }

              placeholder="Enter pickup location"

              required
            />

            {/* EXPIRY */}

            <Input

              label="Expiry Time"

              type="datetime-local"

              name="expiryTime"

              value={
                formData.expiryTime
              }

              onChange={
                handleChange
              }

              required
            />

            {/* DESCRIPTION */}

            <div>

              <label
                className="
                  block
                  mb-2
                  font-medium
                  text-gray-700
                "
              >

                Description

              </label>

              <textarea

                name="description"

                value={
                  formData.description
                }

                onChange={
                  handleChange
                }

                rows={5}

                placeholder="Enter food details"

                className="
                  w-full
                  px-4
                  py-3
                  border
                  border-gray-300
                  rounded-lg
                  outline-none
                  focus:ring-2
                  focus:ring-orange-400
                "
              />

            </div>

            {/* IMAGE */}

            <div>

              <label
                className="
                  block
                  mb-2
                  font-medium
                  text-gray-700
                "
              >

                Food Image

              </label>

              <input

                type="file"

                accept="image/*"

                onChange={
                  handleImageChange
                }

                className="
                  w-full
                "
              />

            </div>

            {/* PREVIEW */}

            {preview && (

              <img

                src={preview}

                alt="preview"

                className="
                  w-full
                  h-64
                  object-cover
                  rounded-xl
                "
              />
            )}

            {/* BUTTON */}

            <Button

              type="submit"

              loading={isPending}

              fullWidth
            >

              Donate Food

            </Button>

          </form>

        </Card>

      </DashboardLayout>
    );
  };

export default DonateFood;