"use client";

import withAuth from "@/components/auth/withAuth";
import Button from "@/components/buttons/Button";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Tracker: React.FC = () => {
  const router = useRouter();

  return (
    <div className="h-[85%]">
      <Button
        name="Add New Workout"
        width="13rem"
        height="3rem"
        onClick={() => router.push("/tracker/add-workout")}
      ></Button>
      <div className="flex w-full gap-10 h-[100%] mt-[2rem]">
        <div className="flex flex-col gap-5 w-[70%]">
          <div className=" h-[20%] mb-10">
            Today's Workout:
            <div className=" h-full bg-white shadow-md border-none rounded-md"></div>
          </div>
          <div className=" h-[80%]">
            Tomorrow's Workout:
            <div className=" h-full bg-white shadow-md border-none rounded-md"></div>
          </div>
        </div>
        <div className=" w-[30%]">
          Achievements:
          <div className=" h-full bg-white shadow-md border-none rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Tracker);
