"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useAddedWorkouts from "@/hooks/requests/tracker/useAddedWorkouts";
import Button from "@/components/buttons/Button";
import useSetWorkout from "@/hooks/requests/tracker/useSetWorkout";
import useUserdata from "@/hooks/useUserdata";

const Exercise = () => {
  const search = useSearchParams();
  const { workouts, getByDate, filteredResponse, getAllUserWorkouts } =
    useAddedWorkouts();
  const completeWorkout = useSetWorkout();
  const date = search.get("date");
  const user = useUserdata();

  let ExerciseCount = 0;
  if (filteredResponse) {
    ExerciseCount = filteredResponse.length;
  }

  console.log(workouts);

  ExerciseCount + 1;
  useEffect(() => {
    if (date) {
      getByDate(date); // Fetch workouts for the selected date
      console.log(filteredResponse);
    }
  }, [workouts, date]);

  useEffect(() => {
    if (user) getAllUserWorkouts(user?.userId);
  }, [user?.userId]);

  const handleComplete = (
    addedId: number,
    name: string,
    reps: number,
    isComplete: boolean
  ) => {
    console.log(addedId);
    console.log(name);
    console.log(reps);
    console.log(isComplete);
    completeWorkout(addedId, name, reps, isComplete);
  };

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
                  className={`border-none rounded-md bg-blue p-4 font-bold text-[20px] ${
                    x.isComplete ? "bg-successGreen" : "bg-red"
                  }`}
                  onClick={() =>
                    handleComplete(
                      x.addedExerciseId,
                      x.Name,
                      x.reps,
                      x.isComplete
                    )
                  }
                >
                  {x.isComplete ? "Done" : "Wala"}
                </button>
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
