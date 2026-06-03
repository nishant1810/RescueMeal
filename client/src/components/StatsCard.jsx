import React from "react";

const StatsCard = ({
  title,
  value,
  color,
}) => {
  return (
    <div
      className={`
        p-6
        rounded-xl
        shadow-lg
        text-white
        ${color}
      `}
    >
      <h2
        className="
          text-lg
          font-semibold
        "
      >
        {title}
      </h2>

      <p
        className="
          text-4xl
          font-bold
          mt-4
        "
      >
        {value}
      </p>
    </div>
  );
};

export default StatsCard;