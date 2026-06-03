import React from "react";

const ErrorState = ({
  title =
    "Something went wrong",
  message =
    "Please try again later",
  onRetry,
}) => {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-md
      p-10
      text-center
    "
    >
      {/* ICON */}

      <div
        className="
        text-6xl
        mb-4
      "
      >
        ⚠️
      </div>

      {/* TITLE */}

      <h2
        className="
        text-2xl
        font-bold
        mb-3
      "
      >
        {title}
      </h2>

      {/* MESSAGE */}

      <p
        className="
        text-gray-500
        mb-6
      "
      >
        {message}
      </p>

      {/* RETRY */}

      {onRetry && (
        <button
          onClick={onRetry}
          className="
          bg-black
          text-white
          px-6
          py-3
          rounded-lg
          hover:bg-gray-800
          transition
        "
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorState;