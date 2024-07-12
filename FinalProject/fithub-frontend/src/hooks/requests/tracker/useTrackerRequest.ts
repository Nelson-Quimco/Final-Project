import {
  FitnessExercise,
  FitnessExerciseResponse,
} from "@/constants/trackerType";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

const axiosReq = axios.create({ baseURL: process.env.NEXT_PUBLIC_URL });

const useTrackerRequest = () => {
  const [data, setData] = useState<FitnessExerciseResponse | null>(null);
  const [filteredData, setFilteredData] =
    useState<FitnessExerciseResponse | null>(null);
  const [exercise, setExercise] = useState<FitnessExercise | null>(null);

  const getExercises = async () => {
    try {
      const res = await axiosReq.get("/fitness-tracking");
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterExercise = async (type: string, level: string) => {
    try {
      const res = await axiosReq.get(
        `/fitness-tracking/type/${type}/level/${level}`
      );
      setFilteredData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("no data");
    }
  };

  useEffect(() => {
    getExercises();
  }, []);

  const getExerciseById = useCallback(async (id: number) => {
    try {
      const res = await axiosReq.get(`fitness-tracking/get-exercise/${id}`);
      setExercise(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const values = useMemo(() => {
    return { exercise };
  }, [exercise]);

  return {
    ...values,
    data,
    filteredData,
    getExercises,
    filterExercise,
    getExerciseById,
  };
};

export default useTrackerRequest;
