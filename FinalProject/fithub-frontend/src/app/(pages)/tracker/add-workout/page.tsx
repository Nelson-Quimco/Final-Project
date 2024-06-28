"use client";
import Button from "@/components/buttons/Button";
import useTrackerRequest from "@/hooks/requests/tracker/useTrackerRequest";
import React, { useEffect } from "react";
import { IoEye } from "react-icons/io5";

const AddWorkout = () => {
  const { data, getExercises } = useTrackerRequest();

  useEffect(() => {
    getExercises();
  }, []);

  const viewExercises = (id: number) => {
    console.log();
  };

  return (
    <div className="w-full h-full bg-white shadow-md border-none rounded-md p-5 flex flex-col">
      <div className="font-bold text-[20px] mb-4">ADD NEW WORKOUT</div>
      <div className="w-full flex-grow flex gap-6">
        <div className="w-[70%] h-full border rounded-md">
          <form action="POST">
            <div></div>
          </form>
        </div>
        <div className="w-[30%] h-full border rounded-md p-3 flex flex-col">
          <p className="font-bold text-[20px] mb-4">Available Workout</p>
          <div className="flex-grow h-96 overflow-y-auto">
            {data && data.data ? (
              data.data.map((x) => (
                <div
                  key={x.id}
                  className="flex items-center gap-4 p-2 border-b"
                >
                  <Button name="add" width="60px" className=""></Button>
                  <div>
                    <p>{x.Name}</p>
                    <p>Type: {x.Type}</p>
                  </div>
                  <IoEye onClick={() => viewExercises(x.id)} />
                </div>
              ))
            ) : (
              <div>No Data</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWorkout;
