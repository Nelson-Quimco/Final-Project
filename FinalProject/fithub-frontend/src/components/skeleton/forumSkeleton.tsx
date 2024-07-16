import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ForumSkeleton = () => {
  return (
    <div className="border-none rounded-md shadow-md p-4 flex flex-col gap-6 w-full bg-offWhite">
      <div className="flex justify-between">
        <div className="font-bold">
          <Skeleton width={100} />
        </div>
        <div>
          <Skeleton width={50} />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="font-bold">
          <Skeleton width={200} />
        </div>
        <div className="line-clamp-3 text-wrap whitespace-pre-line">
          <Skeleton count={3} />
        </div>
        <div className="flex gap-1">
          <Skeleton width={20} height={20} circle={true} />
          <div>
            <Skeleton width={100} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumSkeleton;
