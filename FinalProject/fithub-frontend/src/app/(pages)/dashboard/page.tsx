"use client";
import withAuth from "@/components/auth/withAuth";
import React from "react";
import { GiBiceps } from "react-icons/gi";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-3 gap-10 h-full grid-rows-[10rem_auto]">
      <div className="flex rounded-[5px] w-full h-full border">
        <div className="w-[50%] bg-blue h-full flex flex-col items-center justify-between p-3">
          <p className="text-white text-[35px]">Fit Level</p>
          <GiBiceps size={100} className=" text-brightRed" />
        </div>

        {/* sfsdfsdfsfdmsdlkm */}
        <div className=" flex justify-center items-center w-[50%] font-bold text-[100px]">
          S
        </div>
      </div>
      <div className="rounded-[5px] w-full h-full border">
        <div className="bg-blue text-white h-[50px] text-center text-[25px] p-2">
          Today's Workout
        </div>
        <div></div>
      </div>
      <div className="rounded-[5px] w-full h-full border">
        <div className="bg-blue text-white h-[50px] text-center text-[25px] p-2">
          Tomorrow's Workout
        </div>
      </div>

      <div className="rounded-[5px] w-full h-full border col-span-2"></div>
      <div className="rounded-[5px] w-full h-full border"></div>
    </div>
  );
};

export default withAuth(Dashboard);
