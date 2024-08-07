import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileCardSkeleton = () => {
  return (
    <div className="flex w-full border-none rounded-lg shadow-md bg-offWhite">
      <div className=" h-full w-[20%] flex flex-col items-center gap-3 p-2">
        <div className="border p-10 rounded-full"></div>
        <Skeleton width={150} height={40} />
        <Skeleton width={100} />
      </div>
      <div className="flex flex-col w-[80%] gap-10 p-10 text-[20px]">
        <div className="flex justify-between">
          <div className="flex flex-col justify-start gap-6 w-full font-bold">
            <p>
              Firstname:
              <span className="font-normal text-[18px] ml-[10px]">
                <Skeleton width={150} />
              </span>
            </p>
            <p>
              Username:
              <span className=" font-normal text-[18px] ml-[10px]">
                <Skeleton width={150} />
              </span>
            </p>
          </div>
          <div className="flex flex-col justify-start gap-6 w-full font-bold">
            <p>
              Lastname:
              <span className=" font-normal text-[18px] ml-[10px]">
                <Skeleton width={150} />
              </span>
            </p>
            <p>
              Email:
              <span className=" font-normal text-[18px] ml-[10px]">
                <Skeleton width={150} />
              </span>
            </p>
          </div>
        </div>
        <div className="text-center"></div>
      </div>
    </div>
  );
};

export default ProfileCardSkeleton;
