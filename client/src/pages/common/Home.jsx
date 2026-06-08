import React,
{
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

/*
========================================
IMAGES
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
HOME
========================================
*/

const Home =
  () => {

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
        clearInterval(
          interval
        );

    }, [slides.length]);

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
          className="absolute inset-0"
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

              md:px-12

              py-6
            "
          >

            {/* LOGO */}

            <h1

              className="

                text-3xl

                md:text-5xl

                font-extrabold

                text-orange-500
              "
            >

              RescueMeal

            </h1>

            {/* LINKS */}

            <div

              className="

                flex

                items-center

                gap-5

                md:gap-8

                text-sm

                md:text-lg

                font-medium
              "
            >

              <a

                href="#about"

                className="

                  hover:text-green-400

                  transition-all

                  duration-200
                "
              >

                About

              </a>

              <Link

                to="/register"

                className="

                  hover:text-green-400

                  transition-all

                  duration-200
                "
              >

                Sign Up

              </Link>

              <Link

                to="/login"

                className="

                  hover:text-green-400

                  transition-all

                  duration-200
                "
              >

                Login

              </Link>

            </div>

          </nav>

          {/* ========================================
              HERO SECTION
          ======================================== */}

          <div

            className="

              flex-1

              flex

              items-center

              px-6

              md:px-16
            "
          >

            <div
              className="max-w-4xl"
            >

              {/* TITLE */}

              <h1

                className="

                  text-5xl

                  sm:text-6xl

                  md:text-8xl

                  font-extrabold

                  leading-tight

                  mb-8
                "
              >

                Serving Communities,

                <br />

                One Plate at a Time

              </h1>

              {/* DESCRIPTION */}

              <p

                className="

                  text-lg

                  md:text-2xl

                  text-gray-200

                  leading-relaxed

                  mb-10

                  max-w-3xl
                "
              >

                RescueMeal connects

                food donors,

                NGOs,

                and volunteers

                to reduce food waste

                and provide meals

                to people in need.

              </p>

              {/* BUTTONS */}

              <div

                className="

                  flex

                  flex-wrap

                  gap-4
                "
              >

                {/* JOIN NOW */}

                <Link

                  to="/register"

                  className="

                    bg-green-500

                    hover:bg-green-600

                    px-8

                    py-4

                    rounded-xl

                    text-lg

                    font-bold

                    shadow-lg

                    transition-all

                    duration-200
                  "
                >

                  Join Now

                </Link>

                {/* LOGIN */}

                <Link

                  to="/login"

                  className="

                    border

                    border-white

                    hover:bg-white

                    hover:text-black

                    px-8

                    py-4

                    rounded-xl

                    text-lg

                    font-bold

                    transition-all

                    duration-200
                  "
                >

                  Login

                </Link>

              </div>

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
            "
          >

            {slides.map(

              (

                _,

                index
              ) => (

                <button

                  key={index}

                  onClick={() =>

                    setCurrentSlide(
                      index
                    )
                  }

                  className={`

                    w-4

                    h-4

                    rounded-full

                    transition-all

                    duration-200

                    ${

                      index === currentSlide

                        ? "bg-white scale-110"

                        : "bg-gray-500 hover:bg-gray-300"
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

export default
Home;