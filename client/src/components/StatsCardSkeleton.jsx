import React from "react";

import Skeleton
from "react-loading-skeleton";

const StatsCardSkeleton =
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
        <Skeleton
          height={20}
          width={120}
        />

        <div className="mt-4">
          <Skeleton
            height={40}
            width={80}
          />
        </div>
      </div>
    );
  };

export default
StatsCardSkeleton;