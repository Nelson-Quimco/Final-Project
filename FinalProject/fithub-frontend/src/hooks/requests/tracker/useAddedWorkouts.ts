import { addedExerciseRes, addedExerciseType } from "@/constants/addedWorkout";
import axios from "axios";
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
  const [loading, setLoading] = useState<boolean>();

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
      if (workouts?.data.length > 0) {
        const filteredWorkouts = workouts.data.filter((workout) => {
          const exerciseDate = new Date(workout.setDate)
            .toISOString()
            .split("T")[0]; // Extract exercise date without time
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
    setGroupedByDate(groupedData);
  };

  useEffect(() => {
    getAllUserWorkouts(6);
  }, []);

  useEffect(() => {
    if (workouts?.data) {
      groupWorkoutsByDate(workouts.data);
    }
  }, [workouts]);

  return {
    workouts,
    getByDate,
    filteredResponse,
    groupedByDate,
    loading,
    setLoading,
  };
};

export default useAddedWorkouts;
