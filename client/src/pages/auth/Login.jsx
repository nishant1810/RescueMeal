import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  loginUser,
} from "../../services/auth.service";

import {
  useAuth,
} from "../../context/AuthContext";

import getDashboardRoute
from "../../utils/getDashboardRoute";

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
LOGIN PAGE
========================================
*/

const Login =
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
    AUTH CONTEXT
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

      email: "",

      password: "",
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

        setFormData(
          (prev) => ({

            ...prev,

            [name]: value,
          })
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

            !formData.email.trim() ||

            !formData.password.trim()

          ) {

            return toast.error(
              "Please fill all fields"
            );
          }

          setLoading(true);

          /*
          ========================================
          LOGIN API
          ========================================
          */

          const data =
            await loginUser(
              formData
            );

          /*
          ========================================
          SAVE USER
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
            "Login Successful"
          );

          /*
          ========================================
          DASHBOARD ROUTE
          ========================================
          */

          const dashboardRoute =
            getDashboardRoute(
              data.user.role
            );

          /*
          ========================================
          REDIRECT
          ========================================
          */

          navigate(
            dashboardRoute
          );

        } catch (error) {

          console.log(error);

          toast.error(

            error.response?.data
              ?.message ||

            "Login Failed"
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

                alt="slide"

                className={`
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  transition-opacity
                  duration-1000
                  ${
                    index ===
                    currentSlide

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

          {/* NAVBAR */}

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
                to="/register"
                className="
                  hover:text-green-400
                  transition
                "
              >

                Register

              </Link>

            </div>

          </nav>

          {/* LOGIN FORM */}

          <div

            className="
              flex-1
              flex
              items-center
              justify-center
              px-4
            "
          >

            <div

              className="
                w-full
                max-w-2xl
                bg-black/40
                backdrop-blur-md
                border
                border-white/20
                rounded-2xl
                p-6
                md:p-10
                shadow-2xl
              "
            >

              {/* TITLE */}

              <h1

                className="
                  text-5xl
                  md:text-7xl
                  font-bold
                  text-center
                  mb-10
                "
              >

                Login

              </h1>

              {/* FORM */}

              <form

                onSubmit={
                  handleSubmit
                }

                className="
                  space-y-8
                "
              >

                {/* EMAIL */}

                <div>

                  <label

                    className="
                      block
                      text-xl
                      md:text-2xl
                      font-semibold
                      mb-3
                    "
                  >

                    Email

                  </label>

                  <input

                    type="email"

                    name="email"

                    value={
                      formData.email
                    }

                    placeholder="Enter your email"

                    onChange={
                      handleChange
                    }

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
                      md:text-2xl
                      font-semibold
                      mb-3
                    "
                  >

                    Password

                  </label>

                  <input

                    type="password"

                    name="password"

                    value={
                      formData.password
                    }

                    placeholder="Enter your password"

                    onChange={
                      handleChange
                    }

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

                {/* BUTTONS */}

                <div

                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-4
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

                    {loading

                      ? "Logging In..."

                      : "LOGIN"
                    }

                  </button>

                  <Link

                    to="/register"

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

                    REGISTER

                  </Link>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>
    );
  };

export default Login;