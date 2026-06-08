import React from "react";

import Skeleton
from "react-loading-skeleton";

const TableSkeleton =
  () => {
    return (
      <div
        className="
        bg-white
        p-6
        rounded-2xl
        shadow-md
      "
      >
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="
              mb-4
            "
            >
              <Skeleton
                height={30}
              />
            </div>
          ))}
      </div>
    );
  };

export default
TableSkeleton;