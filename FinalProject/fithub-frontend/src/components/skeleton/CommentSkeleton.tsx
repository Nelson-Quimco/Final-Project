import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CommentSkeleton = () => {
  return (
    <>
      <div className="flex flex-col w-full h-full p-3 gap-3 border-none rounded-lg">
        <div className="flex justify-between font-semibold text-[15px]">
          <div>
            <Skeleton height={30} />
          </div>
          <div className={`flex gap-2`}>
            <Skeleton height={30} />
            <Skeleton height={30} />
          </div>
        </div>
        <div>
          <Skeleton height={30} />
        </div>
        <div className="flex items-center gap-1 ">
          <Skeleton height={30} />
        </div>
      </div>
    </>
  );
};

export default CommentSkeleton;
