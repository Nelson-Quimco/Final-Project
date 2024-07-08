import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const WorkoutSkeleton = () => {
  return (
    <div className="p-3 border rounded-md">
      <div>
        <p className="font-bold text-[15px]">
          <Skeleton width={250} />
        </p>
        <p>
          <Skeleton width={100} />
        </p>
      </div>
    </div>
  );
};

export default WorkoutSkeleton;
