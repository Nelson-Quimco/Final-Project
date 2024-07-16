import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SinglePost = () => {
  return (
    <div className="flex flex-col border-nones rounded-md shadow-md p-6 gap-6 bg-offWhite ">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-bold text-[20px]">
            <Skeleton width={200} />
          </p>
          <p className="text-[14px]">
            <Skeleton width={200} />
          </p>
        </div>
        <div className={`flex gap-3 `}>
          <Skeleton width={200} />
          <Skeleton width={200} />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="font-bold text-[25px]">
          <Skeleton width={200} height={20} />
        </div>
        <div className="w-full flex flex-col gap-6">
          <p className="w-full whitespace-pre-line break-words text-justify">
            <Skeleton width={800} count={3} />
          </p>
          <div className="flex items-center gap-2">
            <button>
              <Skeleton width={200} />
            </button>
            <Skeleton width={200} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
