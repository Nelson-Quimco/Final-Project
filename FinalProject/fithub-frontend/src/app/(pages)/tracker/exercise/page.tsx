"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useAddedWorkouts from "@/hooks/requests/tracker/useAddedWorkouts";
import useUserdata from "@/hooks/useUserdata";
import { formatDateNormal } from "@/lib/functions/dateFormatter";
import Button from "@/components/buttons/Button";

const Exercise = () => {
  const {
    workouts,
    getByDate,
    filteredResponse,
    getAllUserWorkouts,
    completeWorkout,
    updateWorkout,
  } = useAddedWorkouts();

  const search = useSearchParams();
  const date = search.get("date");
  const user = useUserdata();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedReps, setEditedReps] = useState<Record<number, number>>({});

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

  const handleComplete = (
    addedId: number,
    name: string,
    reps: number,
    isComplete: boolean
  ) => {
    if (user?.userId) {
      completeWorkout(addedId, name, reps, isComplete, user.userId);
    }
  };

  const handleRepsChange = (addedExerciseId: number, reps: number) => {
    setEditedReps((prev) => ({
      ...prev,
      [addedExerciseId]: reps,
    }));
  };

  const handleSubmitEdit = async () => {
    if (filteredResponse) {
      for (const exercise of filteredResponse) {
        const updatedReps =
          editedReps[exercise.addedExerciseId] ?? exercise.reps;
        await updateWorkout(
          exercise.addedExerciseId,
          updatedReps,
          exercise.setDate
        );
      }
      if (user) {
        await getAllUserWorkouts(user.userId);
      }
      setIsEditing(false);
    }
  };

  console.log(isEditing);

  return (
    <>
      <div className="h-full">
        <p className="font-bold text-[25px]">Exercise for {date}</p>
        <p className="ml-10 text-[20px]">{ExerciseCount} Exercise/s</p>
        <div className="flex flex-col gap-6 items-center">
          <div className="mt-6 flex flex-col p-6 gap-10 w-[50rem] h-[35rem] overflow-y-auto shadow-md">
            <button
              className="self-end bg-blue text-white p-2 border-none shadow-md rounded-md text-[18px] w-[4rem]"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              Edit
            </button>
            {filteredResponse?.map((x, index) => (
              <div key={index} className="flex gap-10">
                <div className="flex justify-between bg-blueGrey w-full border-none rounded-md p-6 font-semibold text-[20px]">
                  <p>{x.Name}</p>
                  {isEditing ? (
                    <div className="flex gap-3">
                      <input
                        className="border-none rounded-md p-1 w-[4rem] text-center"
                        type="number"
                        value={editedReps[x.addedExerciseId] ?? x.reps}
                        onChange={(e) =>
                          handleRepsChange(
                            x.addedExerciseId,
                            Number(e.target.value)
                          )
                        }
                      />
                      <p>reps</p>
                    </div>
                  ) : (
                    <p className="">{x.reps} reps</p>
                  )}
                </div>
                <button
                  disabled={disabled}
                  className={`border-none rounded-md bg-blue p-3 font-bold text-[20px] w-[6rem] ${
                    disabled
                      ? "bg-gray text-[10px] hover:cursor-not-allowed"
                      : x.isComplete
                      ? "bg-successGreen"
                      : "bg-red text-gray"
                  }`}
                  onClick={() =>
                    handleComplete(
                      x.addedExerciseId,
                      x.Name,
                      x.reps,
                      x.isComplete ? false : true
                    )
                  }
                >
                  {disabled
                    ? `Locked until ${formatDateNormal(date)}`
                    : x.isComplete
                    ? "Done"
                    : "Not Done"}
                </button>
              </div>
            ))}
          </div>
          <div className={`${isEditing ? "" : "hidden"}`}>
            <Button name="Save Edit" onClick={handleSubmitEdit}></Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Exercise;
