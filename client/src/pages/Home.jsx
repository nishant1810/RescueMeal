import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import slide1 from "../assets/ImgDisplay.jpg";
import slide2 from "../assets/info-img.jpg";
import slide3 from "../assets/pic-1.avif";
import slide4 from "../assets/pexels-mehmet-turgut-kirkgoz-11576242.jpg";

const Home = () => {
  const slides = [
    slide1,
    slide2,
    slide3,
    slide4,
  ];

  const [currentSlide, setCurrentSlide] =
    useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1
          ? 0
          : prev + 1
      );
    }, 4000);

    return () =>
      clearInterval(interval);
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
      {/* SLIDES */}

      <div
        className="
        absolute
        inset-0
      "
      >
        {slides.map(
          (slide, index) => (
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
          bg-black/65
        "
        />
      </div>

      {/* CONTENT */}

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
          md:px-12
          py-6
        "
        >
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
            <a
              href="#about"
              className="
              hover:text-green-400
              transition
            "
            >
              About
            </a>

            <Link
              to="/register"
              className="
              hover:text-green-400
              transition
            "
            >
              Sign Up
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

        {/* HERO SECTION */}

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
            className="
            max-w-4xl
          "
          >
            <h1
              className="
              text-5xl
              md:text-8xl
              font-bold
              leading-tight
              mb-8
            "
            >
              Serving Communities,
              One Plate at a Time
            </h1>

            <p
              className="
              text-lg
              md:text-2xl
              text-gray-200
              leading-relaxed
              mb-10
            "
            >
              RescueMeal connects food
              donors, NGOs, and
              volunteers to reduce food
              waste and provide meals
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
              <Link
                to="/register"
                className="
                bg-green-500
                hover:bg-green-600
                px-8
                py-4
                rounded-lg
                text-lg
                font-bold
                transition
              "
              >
                Join Now
              </Link>

              <Link
                to="/login"
                className="
                border
                border-white
                hover:bg-white
                hover:text-black
                px-8
                py-4
                rounded-lg
                text-lg
                font-bold
                transition
              "
              >
                Login
              </Link>
            </div>
          </div>
        </div>

        {/* SLIDE INDICATORS */}

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

export default Home;