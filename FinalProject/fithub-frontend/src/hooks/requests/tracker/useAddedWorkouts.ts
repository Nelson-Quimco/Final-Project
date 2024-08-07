import { addedExerciseRes, addedExerciseType } from "@/constants/addedWorkout";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const axiosReq = axios.create({ baseURL: process.env.NEXT_PUBLIC_URL });

const useAddedWorkouts = () => {
  const [workouts, setWorkouts] = useState<addedExerciseRes | null>(null);
  const [groupedByDate, setGroupedByDate] = useState<
    Record<string, addedExerciseType[]>
  >({});
  const [filteredResponse, setFilteredResponse] = useState<
    addedExerciseType[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [completeLoading, setCompleteLoading] = useState<boolean>(false);

  const getAllUserWorkouts = async (id: number) => {
    setLoading(true);
    try {
      const res = await axiosReq.get(`fitness-tracking/${id}`);
      setLoading(false);
      setWorkouts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getByDate = (date: string) => {
    if (workouts) {
      const targetDate = new Date(date).toISOString().split("T")[0];
      if (workouts.data.length > 0) {
        const filteredWorkouts = workouts.data.filter((workout) => {
          const exerciseDate = new Date(workout.setDate)
            .toISOString()
            .split("T")[0];
          return exerciseDate === targetDate;
        });
        setFilteredResponse(filteredWorkouts);
      }
    }
  };

  const groupWorkoutsByDate = (data: addedExerciseType[]) => {
    const groupedData = data.reduce(
      (acc: Record<string, addedExerciseType[]>, workout) => {
        const date = new Date(workout.setDate).toISOString().split("T")[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(workout);
        return acc;
      },
      {}
    );
    console.log(groupedData);
    setGroupedByDate(groupedData);
  };

  const completeWorkout = async (
    addedId: number,
    name: string,
    reps: number,
    isComplete: boolean,
    userId: number
  ) => {
    setCompleteLoading(true);
    try {
      const body = {
        addedExerciseId: addedId,
        name: name,
        reps: reps,
        isComplete: isComplete,
      };
      await axiosReq.post("fitness-tracking/isCompleted", body);
      await getAllUserWorkouts(userId); // Refresh after completing workout
      setCompleteLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteWorkout = async (id: number) => {
    try {
      await axiosReq.delete(`fitness-tracking/delete-addedExercise/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateWorkout = async (
    addedExerciseId: number,
    reps: number,
    setDate: string
  ) => {
    setLoading(true);
    try {
      const body = {
        reps,
        setDate,
      };
      await axiosReq.patch(
        `fitness-tracking/update-addedExercise/${addedExerciseId}`,
        body
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("this effect is running");
    if (workouts?.data) {
      console.log("workout data exist");
      groupWorkoutsByDate(workouts.data);
    }
  }, [workouts]);

  return {
    workouts,
    filteredResponse,
    groupedByDate,
    loading,
    completeLoading,
    updateWorkout,
    getByDate,
    setLoading,
    getAllUserWorkouts,
    completeWorkout,
    deleteWorkout,
  };
};

export default useAddedWorkouts;
