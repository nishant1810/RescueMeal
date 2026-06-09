import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

/*
========================================
SERVICES
========================================
*/

import {
  registerUser,
} from "../../services/auth.service.js";

/*
========================================
AUTH CONTEXT
========================================
*/

import {
  useAuth,
} from "../../context/AuthContext.jsx";

/*
========================================
UTILS
========================================
*/

import getDashboardRoute
from "../../utils/getDashboardRoute.js";

/*
========================================
ASSETS
========================================
*/

import slide1
from "../../assets/animations/ImgDisplay.jpg";

import slide2
from "../../assets/animations/info-img.jpg";

import slide3
from "../../assets/animations/pic-1.avif";

import slide4
from "../../assets/animations/pexels-mehmet-turgut-kirkgoz-11576242.jpg";

/*
========================================
REGISTER PAGE
========================================
*/

const Register = () => {

  /*
  ========================================
  NAVIGATION
  ========================================
  */

  const navigate =
    useNavigate();

  /*
  ========================================
  AUTH
  ========================================
  */

  const {
    login,
  } = useAuth();

  /*
  ========================================
  SLIDES
  ========================================
  */

  const slides = [
    slide1,
    slide2,
    slide3,
    slide4,
  ];

  /*
  ========================================
  STATE
  ========================================
  */

  const [
    currentSlide,
    setCurrentSlide,
  ] = useState(0);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    formData,
    setFormData,
  ] = useState({

    name: "",

    email: "",

    password: "",

    role: "donor",
  });

  /*
  ========================================
  AUTO SLIDER
  ========================================
  */

  useEffect(() => {

    const interval =
      setInterval(() => {

        setCurrentSlide(
          (prev) =>

            prev ===
            slides.length - 1

              ? 0

              : prev + 1
        );

      }, 4000);

    return () =>
      clearInterval(interval);

  }, [slides.length]);

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

      setFormData((prev) => ({

        ...prev,

        [name]: value,
      }));
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

          !formData.name.trim() ||

          !formData.email.trim() ||

          !formData.password.trim()
        ) {

          return toast.error(
            "Please fill all fields"
          );
        }

        /*
        ========================================
        PASSWORD VALIDATION
        ========================================
        */

        if (
          formData.password.length < 6
        ) {

          return toast.error(
            "Password must be at least 6 characters"
          );
        }

        /*
        ========================================
        LOADING
        ========================================
        */

        setLoading(true);

        /*
        ========================================
        REGISTER API
        ========================================
        */

        const data =
          await registerUser(
            formData
          );

        /*
        ========================================
        LOGIN USER
        ========================================
        */

        login(
          data.user,
          data.token
        );

        /*
        ========================================
        SUCCESS
        ========================================
        */

        toast.success(
          "Registration Successful"
        );

        /*
        ========================================
        DASHBOARD REDIRECT
        ========================================
        */

        navigate(
          getDashboardRoute(
            data.user.role
          )
        );

      } catch (error) {

        console.error(error);

        toast.error(

          error.response?.data
            ?.message ||

          "Registration Failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div

      className="
        relative
        min-h-screen
        overflow-hidden
        text-white
      "
    >

      {/* ========================================
          BACKGROUND SLIDES
      ======================================== */}

      <div
        className="
          absolute
          inset-0
        "
      >

        {slides.map(
          (
            slide,
            index
          ) => (

            <img

              key={index}

              src={slide}

              alt={`slide-${index}`}

              className={`
                absolute
                inset-0
                w-full
                h-full
                object-cover
                transition-opacity
                duration-1000

                ${
                  index === currentSlide

                    ? "opacity-100"

                    : "opacity-0"
                }
              `}
            />
          )
        )}

        {/* OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-black/70
          "
        />

      </div>

      {/* ========================================
          CONTENT
      ======================================== */}

      <div
        className="
          relative
          z-10
          min-h-screen
          flex
          flex-col
        "
      >

        {/* ========================================
            NAVBAR
        ======================================== */}

        <nav
          className="
            flex
            justify-between
            items-center
            px-6
            md:px-10
            py-6
          "
        >

          <Link to="/">

            <h1
              className="
                text-3xl
                md:text-5xl
                font-bold
                text-orange-500
              "
            >

              RescueMeal

            </h1>

          </Link>

          <div
            className="
              flex
              gap-6
              md:gap-10
              text-sm
              md:text-xl
              font-medium
            "
          >

            <Link
              to="/"
              className="
                hover:text-green-400
                transition
              "
            >

              About

            </Link>

            <Link
              to="/login"
              className="
                hover:text-green-400
                transition
              "
            >

              Login

            </Link>

          </div>

        </nav>

        {/* ========================================
            FORM SECTION
        ======================================== */}

        <div
          className="
            flex-1
            flex
            items-center
            justify-center
            px-4
            py-10
          "
        >

          <div
            className="
              w-full
              max-w-xl
              bg-black/40
              backdrop-blur-md
              border
              border-white/20
              rounded-2xl
              p-6
              md:p-8
              shadow-2xl
            "
          >

            {/* TITLE */}

            <h1
              className="
                text-5xl
                md:text-6xl
                font-bold
                text-center
                mb-10
              "
            >

              Register

            </h1>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="
                space-y-6
              "
            >

              {/* NAME */}

              <div>

                <label
                  className="
                    block
                    text-xl
                    font-semibold
                    mb-2
                  "
                >

                  Full Name

                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Enter your name"
                  onChange={handleChange}
                  className="
                    w-full
                    bg-white/10
                    border
                    border-white/20
                    p-4
                    rounded-lg
                    text-white
                    placeholder:text-gray-300
                    focus:outline-none
                    focus:border-green-400
                  "
                />

              </div>

              {/* EMAIL */}

              <div>

                <label
                  className="
                    block
                    text-xl
                    font-semibold
                    mb-2
                  "
                >

                  Email

                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Enter your email"
                  onChange={handleChange}
                  className="
                    w-full
                    bg-white/10
                    border
                    border-white/20
                    p-4
                    rounded-lg
                    text-white
                    placeholder:text-gray-300
                    focus:outline-none
                    focus:border-green-400
                  "
                />

              </div>

              {/* PASSWORD */}

              <div>

                <label
                  className="
                    block
                    text-xl
                    font-semibold
                    mb-2
                  "
                >

                  Password

                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="Enter your password"
                  onChange={handleChange}
                  className="
                    w-full
                    bg-white/10
                    border
                    border-white/20
                    p-4
                    rounded-lg
                    text-white
                    placeholder:text-gray-300
                    focus:outline-none
                    focus:border-green-400
                  "
                />

              </div>

              {/* ROLE */}

              <div>

                <label
                  className="
                    block
                    text-xl
                    font-semibold
                    mb-2
                  "
                >

                  Select Role

                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="
                    w-full
                    bg-white/10
                    border
                    border-white/20
                    p-4
                    rounded-lg
                    text-white
                    focus:outline-none
                    focus:border-green-400
                  "
                >

                  <option
                    value="donor"
                    className="text-black"
                  >

                    Donor

                  </option>

                  <option
                    value="ngo"
                    className="text-black"
                  >

                    NGO

                  </option>

                  <option
                    value="volunteer"
                    className="text-black"
                  >

                    Volunteer

                  </option>

                </select>

              </div>

              {/* BUTTONS */}

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-4
                  pt-2
                "
              >

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    bg-green-500
                    hover:bg-green-600
                    disabled:bg-gray-500
                    py-4
                    rounded-lg
                    text-lg
                    font-bold
                    transition
                  "
                >

                  {
                    loading

                      ? "Registering..."

                      : "REGISTER"
                  }

                </button>

                <Link
                  to="/login"
                  className="
                    bg-blue-500
                    hover:bg-blue-600
                    py-4
                    rounded-lg
                    text-lg
                    font-bold
                    flex
                    items-center
                    justify-center
                    transition
                  "
                >

                  LOGIN

                </Link>

              </div>

              {/* FOOTER */}

              <p
                className="
                  text-center
                  text-gray-300
                  pt-2
                "
              >

                Already have an account?

                {" "}

                <Link
                  to="/login"
                  className="
                    text-green-400
                    hover:text-green-300
                  "
                >

                  Login Here

                </Link>

              </p>

            </form>

          </div>

        </div>

        {/* ========================================
            SLIDE INDICATORS
        ======================================== */}

        <div
          className="
            absolute
            bottom-8
            left-1/2
            -translate-x-1/2
            flex
            gap-3
            z-20
          "
        >

          {slides.map(
            (_, index) => (

              <button

                key={index}

                onClick={() =>
                  setCurrentSlide(index)
                }

                className={`
                  w-4
                  h-4
                  rounded-full
                  transition

                  ${
                    index === currentSlide

                      ? "bg-white"

                      : "bg-gray-500"
                  }
                `}
              />
            )
          )}

        </div>

      </div>

    </div>
  );
};

export default Register;