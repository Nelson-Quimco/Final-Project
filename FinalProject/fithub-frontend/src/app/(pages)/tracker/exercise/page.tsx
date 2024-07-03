"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useAddedWorkouts from "@/hooks/requests/tracker/useAddedWorkouts";
import Button from "@/components/buttons/Button";
import { IoMdCheckmark } from "react-icons/io";

const Exercise = () => {
  const search = useSearchParams();
  const { workouts, getByDate, filteredResponse } = useAddedWorkouts();
  const date = search.get("date");

  let ExerciseCount = 0;
  if (filteredResponse) {
    ExerciseCount = filteredResponse.length;
  }

  ExerciseCount + 1;
  useEffect(() => {
    if (date) {
      getByDate(date); // Fetch workouts for the selected date
    }
  }, [workouts, date]);

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
                <Button name="Done" width="5rem" height="5rem"></Button>
              </div>
            ))}
          </div>
          <Button name="Finish"></Button>
        </div>
      </div>
    </>
  );
};

export default Exercise;
