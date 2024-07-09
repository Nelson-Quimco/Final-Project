import axios from "axios";
import React, { useState } from "react";

const axiosReq = axios.create({ baseURL: process.env.NEXT_PUBLIC_URL });
const useSetWorkout = () => {
  const completeWorkout = async (
    addedId: number,
    name: string,
    reps: number,
    isComplete: boolean
  ) => {
    try {
      const body = {
        addedExerciseId: addedId,
        name: name,
        reps: reps,
        isComplete: true,
      };
      await axiosReq.post("fitness-tracking/isCompleted", body);
    } catch (error) {
      console.log(error);
    }
  };

  return completeWorkout;
};

export default useSetWorkout;
