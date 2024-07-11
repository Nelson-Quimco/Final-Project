"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useAddedWorkouts from "@/hooks/requests/tracker/useAddedWorkouts";
import Button from "@/components/buttons/Button";
import useUserdata from "@/hooks/useUserdata";

const Exercise = () => {
  const {
    workouts,
    getByDate,
    filteredResponse,
    getAllUserWorkouts,
    completeWorkout,
  } = useAddedWorkouts();

  const search = useSearchParams();
  const date = search.get("date");
  const user = useUserdata();
  const [disabled, setDisabled] = useState<boolean>(false);

  let ExerciseCount = 0;

  const currentDate = new Date().toISOString().split("T")[0];

  if (filteredResponse) ExerciseCount = filteredResponse.length;

  ExerciseCount + 1;
  useEffect(() => {
    if (date) {
      getByDate(date);
      console.log(filteredResponse);
      if (date !== currentDate) setDisabled(true);
    }
  }, [workouts, date]);

  useEffect(() => {
    if (user) getAllUserWorkouts(user?.userId);
  }, [user?.userId]);

  return (
    <>
      <div className="h-full">
        <p className="font-bold text-[25px]">Exercise for {date}</p>
        <p className="ml-10 text-[20px]">{ExerciseCount} Exercise/s</p>
        <div className="flex flex-col gap-6 items-center">
          <div className="mt-6 flex flex-col p-6 gap-10 w-[50rem] h-[35rem] overflow-y-auto shadow-md">
            {filteredResponse?.map((x, index) => (
              <div key={index} className="flex gap-10">
                <div className="flex justify-between bg-blueGrey w-full border-none rounded-md p-6 font-semibold text-[20px]">
                  <p>{x.Name}</p>
                  <p className="">{x.reps} reps</p>
                </div>
                <button
                  disabled={true}
                  className={`border-none rounded-md bg-blue p-3 font-bold text-[20px] ${
                    x.isComplete ? "bg-successGreen" : "bg-red text-gray"
                  }`}
                >
                  {x.isComplete ? "Done" : "Failed"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Exercise;
