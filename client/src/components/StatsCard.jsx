import React from "react";

const StatsCard = ({
  title,
  value,
}) => {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-lg
      p-6
    "
    >
      <h2
        className="
        text-gray-500
        text-lg
        mb-2
      "
      >
        {title}
      </h2>

      <p
        className="
        text-4xl
        font-bold
        text-green-500
      "
      >
        {value}
      </p>
    </div>
  );
};

export default StatsCard;