"use client";
import Button from "@/components/buttons/Button";
import Input from "@/components/input/Input";
import useTrackerRequest from "@/hooks/requests/tracker/useTrackerRequest";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddWorkout = () => {
  const { data, getExercises, filterExercise, filteredData } =
    useTrackerRequest();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [type, setType] = useState("");
  const [level, setLevel] = useState("");
  const [title, setTitle] = useState("");

  const router = useRouter();

  useEffect(() => {
    getExercises();
  }, []);

  useEffect(() => {
    filterExercise(type, level);
  }, [type, level]);

  const viewExercises = (id: number) => {
    router.push(`add-workout/${id}`);
  };

  const testRender = () => {
    let dataToMap;

    if (type === "" && level === "") {
      dataToMap = data;
    } else {
      dataToMap = filteredData;
    }

    console.log(dataToMap);

    return dataToMap && dataToMap.data ? (
      dataToMap.data.map((x) => (
        <div
          key={x.id}
          className="flex items-center gap-4 mb-5 border rounded-md"
        >
          <Button
            name="Add"
            width="80px"
            className="bg-blue rounded-tl-sm rounded-bl-sm h-[6rem] text-white text-[1.5rem]"
          ></Button>

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
      ))
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
          <form action="POST" className="flex flex-col gap-10">
            <div>
              <p className="font-bold text-[20px]">Title:</p>
              <Input
                type="text"
                width="20rem"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
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
              <div className="border w-[40rem] h-[16rem]"></div>
            </div>
            <div>
              <p className="font-bold text-[20px]">Set a start Date:</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showIcon
                className="border"
              />
            </div>
            <Button
              name={"Add Workout"}
              className="self-center text-white bg-blue p-3 rounded-md text-[20px] w-[10rem]"
            ></Button>
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
