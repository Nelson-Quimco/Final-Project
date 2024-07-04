"use client";
import Button from "@/components/buttons/Button";
import Input from "@/components/input/Input";
import useTrackerRequest from "@/hooks/requests/tracker/useTrackerRequest";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FitnessExercise } from "@/constants/trackerType";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import useUserdata from "@/hooks/useUserdata";
import useAddedWorkouts from "@/hooks/requests/tracker/useAddedWorkouts";

const axiosReq = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_URL}` });
const AddWorkout = () => {
  const { data, getExercises, filterExercise, filteredData } =
    useTrackerRequest();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [type, setType] = useState("");
  const [level, setLevel] = useState("");
  const [addedExercises, setAddedExercises] = useState<FitnessExercise[]>([]);

  const { groupedByDate } = useAddedWorkouts();
  const user = useUserdata();

  const router = useRouter();

  useEffect(() => {
    getExercises();
  }, []);

  useEffect(() => {
    filterExercise(type, level);
  }, [type, level]);
  console.log(groupedByDate);

  const viewExercises = (id: number) => {
    router.push(`add-workout/${id}`);
  };

  const addExercise = (exercise: FitnessExercise) => {
    setAddedExercises([...addedExercises, { ...exercise, reps: 0 }]);
  };

  const removeExercise = (exerciseId: number) => {
    setAddedExercises(
      addedExercises.filter((exercise) => exercise.id !== exerciseId)
    );
  };

  const handleRepsChange = (exerciseId: number, reps: number) => {
    setAddedExercises(
      addedExercises.map((exercise) =>
        exercise.id === exerciseId ? { ...exercise, reps } : exercise
      )
    );
  };

  const handleAddWorkout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userId = user?.userId;
      console.log(userId);
      for (const exercise of addedExercises) {
        console.log("test");
        const res = await axiosReq.post("/fitness-tracking/add-workout", {
          // userId: userId,
          fitnessExerciseId: exercise.id,
          reps: exercise.reps || 0, // Ensure reps is provided
          setDate: startDate?.toISOString() || new Date().toISOString(),
        });
        console.log(res.data);
      }
      alert("Workout added successfully!");
    } catch (error) {
      console.error("Error adding workout", error);
      alert("Failed to add workout");
    }
  };

  const excludedDates = Object.keys(groupedByDate).map(
    (date) => new Date(date)
  );

  const testRender = () => {
    let dataToMap;

    if (type === "" && level === "") {
      dataToMap = data;
    } else {
      dataToMap = filteredData;
    }

    return dataToMap && dataToMap.data ? (
      dataToMap.data.map((x) => {
        const isAdded = addedExercises.some((ex) => ex.id === x.id);

        return (
          <div
            key={x.id}
            className="flex items-center gap-4 mb-5 border rounded-md"
          >
            <Button
              name={isAdded ? "Added" : "Add"}
              width="80px"
              className={`${
                isAdded ? "bg-brightRed" : "bg-blue"
              } rounded-tl-sm rounded-bl-sm h-[6rem] text-white text-[1.5rem]`}
              onClick={() => !isAdded && addExercise(x)}
              disabled={isAdded}
            />
            <div className="p-2">
              <p className="font-bold text-[18px]">{x.Name}</p>
              <p className="text-[13px]">Type: {x.Type}</p>
              <p className="text-[13px]">Level: {x.Level}</p>
            </div>
            <IoEye
              onClick={() => viewExercises(x.id)}
              className="self-center w-[60px] cursor-pointer"
            />
          </div>
        );
      })
    ) : (
      <div className="text-center">
        Please Select Your Type and Workout Level
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-white shadow-md border-none rounded-md p-5 flex flex-col">
      <div className="font-bold text-[20px] mb-4">ADD NEW WORKOUT</div>
      <div className="w-full flex-grow flex gap-6">
        <div className="w-[70%] h-full border rounded-md p-4 px-10">
          <form className="flex flex-col gap-10" onSubmit={handleAddWorkout}>
            <div className="flex gap-10">
              <div>
                <p className="font-bold text-[20px]">Level:</p>
                <select
                  name="level"
                  id="level"
                  className="border p-1 font-bold rounded-md"
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value="">None</option>
                  <option value="BEGINNER">Beginner</option>
                  <option value="INTERMEDIATE">Intermediate</option>
                  <option value="EXPERT">Expert</option>
                </select>
              </div>
              <div>
                <p className="font-bold text-[20px]">Type:</p>
                <select
                  name="type"
                  id="type"
                  className="border p-1 font-bold rounded-md"
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">None</option>
                  <option value="ABDOMINAL">Abdominal</option>
                  <option value="BACK">Back</option>
                  <option value="BICEPS">Bicep</option>
                  <option value="CARDIO">Cardio</option>
                  <option value="RES">Rest</option>
                </select>
              </div>
            </div>

            <div>
              <p className="font-bold text-[20px]">Added Exercise:</p>
              <div className="border w-[40rem] h-[16rem] p-3 overflow-y-auto">
                {addedExercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="flex items-center gap-4 mb-2 border rounded-md p-2"
                  >
                    <FaTrashAlt
                      size={25}
                      onClick={() => removeExercise(exercise.id)}
                      className="hover:text-red cursor-pointer"
                    />
                    <p className="font-bold text-[18px]">{exercise.Name}</p>
                    <p className="text-[13px]">Type: {exercise.Type}</p>
                    <p className="text-[13px]">Level: {exercise.Level}</p>
                    <div className="flex items-center gap-4">
                      <Input
                        width="100px"
                        type="number"
                        value={exercise.reps}
                        onChange={(e) =>
                          handleRepsChange(exercise.id, Number(e.target.value))
                        }
                      />
                      <p className="font-bold text-[20px]">Reps</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-bold text-[20px]">Set a start Date:</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showIcon
                className="border"
                excludeDates={excludedDates}
              />
            </div>
            <Button
              name="Add Workout"
              className="self-center text-white bg-blue p-3 rounded-md text-[20px] w-[10rem]"
              type="submit"
            />
          </form>
        </div>
        <div className="w-[30%] h-full border rounded-md p-3 flex flex-col">
          <p className="font-bold text-[20px] mb-4">Available Workout</p>
          <div className="flex-grow h-96 overflow-y-auto">{testRender()}</div>
        </div>
      </div>
    </div>
  );
};

export default AddWorkout;
