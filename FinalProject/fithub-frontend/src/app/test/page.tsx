"use client";
import React, { useEffect } from "react";
import useAddWorkouts from "@/hooks/requests/tracker/useAddedWorkouts";

const page = () => {
  const { workouts, groupedByDate } = useAddWorkouts();
  console.log(groupedByDate);
  console.log(workouts);

  return <div></div>;
};

export default page;
