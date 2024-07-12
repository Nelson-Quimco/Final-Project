"use client";
import useTrackerRequest from "@/hooks/requests/tracker/useTrackerRequest";
import React, { useEffect } from "react";

const page = ({ params }: { params: { id: number } }) => {
  const { getExerciseById, exercise } = useTrackerRequest();

  useEffect(() => {
    getExerciseById(params.id);
  }, []);

  useEffect(() => {
    console.log(exercise);
  }, []);

  return (
    <div className="bg-white shadow-lg h-full flex flex-col gap-6 p-8">
      <div className="gap-3 flex flex-col">
        <p className="font-bold text-[25px]">{exercise?.Name}</p>
        <p>Level: {exercise?.Level}</p>
        <p>Type: {exercise?.Type}</p>
      </div>
      <div>
        <p className="font-semibold">Description:</p>
        <p>{exercise?.Description}</p>
      </div>
    </div>
  );
};

export default page;
