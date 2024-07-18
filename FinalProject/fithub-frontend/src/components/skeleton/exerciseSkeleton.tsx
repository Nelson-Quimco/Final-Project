import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ExerciseSkeleton = () => {
  return (
    <>
      <div className="gap-3 flex flex-col">
        <p className="font-bold text-[25px]">
          <Skeleton width={100} />
        </p>
        <p>
           <Skeleton />
        </p>
        <p>
           <Skeleton />
        </p>
      </div>
      <div>
        <p className="font-semibold">Description:</p>
        <p>
          <Skeleton />
        </p>
      </div>
    </>
  );
};

export default ExerciseSkeleton;
