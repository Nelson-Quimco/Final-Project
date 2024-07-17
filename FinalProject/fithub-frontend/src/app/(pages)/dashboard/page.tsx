"use client";
import withAuth from "@/components/auth/withAuth";
import useForumRequest from "@/hooks/requests/forum/useForumRequest";
import useWeather from "@/hooks/requests/weather/useWeather.api";
import Link from "next/link";
import React, { useEffect } from "react";
import { kelvinToCelsius } from "@/lib/functions/tempConverter";
import { getIcons } from "@/lib/functions/weatherIcon";
import Image from "next/image";
import useAddedWorkouts from "@/hooks/requests/tracker/useAddedWorkouts";
import useUserProfile from "@/hooks/requests/user-profile/useUserProfile";
import useUserdata from "@/hooks/useUserdata";
import { FaCheckCircle } from "react-icons/fa";
import { RiCloseCircleFill } from "react-icons/ri";
import WorkoutHistory from "@/components/cards/WorkoutHistory";

const Dashboard = () => {
  const { groupedByDate, filteredResponse, getAllUserWorkouts } =
    useAddedWorkouts();
  const { allPost } = useForumRequest();
  const { data } = useWeather();
  const user = useUserdata();

  let convertedTemp;
  if (data?.main.temp) {
    const temp = kelvinToCelsius(data.main.temp);
    convertedTemp = Math.round(temp);
  }

  useEffect(() => {
    if (user?.userId) {
      getAllUserWorkouts(user.userId);
    }
  }, [user?.userId]);

  const currentDate = new Date();

  const arrayedResult = Object.keys(groupedByDate).filter(
    (date) => new Date(date) < new Date(currentDate)
  );

  const variableYeah = Object.keys(groupedByDate).filter(
    (date) => new Date(date) > new Date(currentDate)
  );

  let failed = 0;
  let completed = 0;

  const test = arrayedResult.map((date) => {
    const exercises = groupedByDate[date];
    const totalExercises = exercises.length;
    const completedExercises = exercises.filter(
      (exercise) => exercise.isComplete
    ).length;
    const status =
      completedExercises === totalExercises ? "Completed" : "Failed";

    if (status === "Completed") {
      completed += 1;
    } else if (status === "Failed") {
      failed += 1;
    }
  });

  return (
    <div className="grid grid-cols-3 gap-10 h-full grid-rows-[10rem_auto]">
      {/* Weather */}
      <div className="flex w-full h-full bg-offWhite shadow-md rounded-[10px]">
        <div className="w-1/2 ">
          <div className="h-full flex flex-col items-center gap-3 justify-center">
            <p className="font-bold text-[40px] text-blue">
              {convertedTemp} °C
            </p>
            <div className="text-blue text-semibold">{data?.name}</div>
          </div>
        </div>
        <div className="w-1/2 bg-blue flex flex-col justify-center items-center">
          {data?.weather[0] && (
            <>
              <img
                src={getIcons(data.weather[0].icon)}
                height={100}
                width={100}
                alt="weather-icons.png"
              />
              <div className="text-offWhite font-semibold text-center">
                {data.weather[0].description}
              </div>
            </>
          )}
        </div>
      </div>
      {/* ============= */}
      <div className="rounded-[5px] w-full h-full bg-offWhite shadow-md">
        <div className="bg-blue text-white h-[50px] text-center text-[25px] p-2">
          Upcoming Workouts
        </div>
        <div className="text-[30px] font-semibold text-center text-blue p-3">
          {variableYeah.length == 0
            ? "You Have No Upcoming Workout"
            : variableYeah[0]}
        </div>
      </div>
      <div className="rounded-[5px] w-full h-full bg-offWhite shadow-md">
        <div className="bg-blue text-offWhite h-[50px] text-center text-[25px] p-2">
          Workout History
        </div>
        <div className="flex items-center p-2 gap-2 text-[18px]">
          <div className="w-full flex font-semibold">
            <FaCheckCircle
              size={50}
              className="text-successGreen self-center"
            />
            <div className="flex flex-col gap-2 items-center justify-center w-full text-blue">
              <p className="text-[40px]">{completed}</p>
              <p>Completed</p>
            </div>
          </div>
          <div className="w-full flex font-semibold">
            <RiCloseCircleFill size={50} className="text-red self-center" />
            <div className="flex flex-col gap-2 items-center justify-center w-full text-blue">
              <p className="text-[40px]">{failed}</p>
              <p>Failed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[5px] w-full h-[42rem] col-span-2 bg-offWhite shadow-md p-6">
        <WorkoutHistory />
      </div>
      <div className="rounded-[5px] w-full h-[42rem] flex flex-col items-center overflow-y-auto bg-offWhite shadow-md">
        <div className="text-[25px] text-offWhite bg-blue w-full text-center p-2">
          Recent Posts
        </div>
        <div className="flex flex-col gap-3 p-4">
          {allPost?.map((posts, index) => (
            <Link
              href={"/forum"}
              className="border-none rounded-md shadow-lg p-3 bg-white flex flex-col gap-2 "
              key={index}
            >
              <p className="font-bold text-[15px]">{posts.title}</p>
              <p className="line-clamp-1 text-wrap whitespace-pre-line">
                {posts.content}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
