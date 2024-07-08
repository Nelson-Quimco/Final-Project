"use client";

import withAuth from "@/components/auth/withAuth";
import Button from "@/components/buttons/Button";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAddedWorkouts from "@/hooks/requests/tracker/useAddedWorkouts";
import Link from "next/link";
import WorkoutCard from "@/components/cards/workout-card";
import Exercise from "./exercise/page";
import WorkoutSkeleton from "@/components/skeleton/workoutCardSkeleton";

const Tracker: React.FC = () => {
  const {
    workouts,
    groupedByDate,
    filteredResponse,
    getByDate,
    loading,
    setLoading,
  } = useAddedWorkouts();

  useEffect(() => {
    console.log(workouts);
    getByDate("2024-07-01T01:07:00.356Z");
  }, [workouts]);

  const router = useRouter();

  const todaysDate = new Date().toISOString().split("T")[0];
  console.log(todaysDate);

  const todaysWorkout = groupedByDate[todaysDate] || [];
  const tomorrowWorkouts = Object.keys(groupedByDate).filter(
    (date) => date !== todaysDate
  );

  return (
    <div className="">
      <Button
        name="Add New Workout"
        width="13rem"
        height="3rem"
        onClick={() => router.push("/tracker/add-workout")}
      ></Button>
      <div className="flex w-full gap-10 h-[100%] mt-[2rem]">
        <div className="flex flex-col gap-6 w-[70%]">
          <div className=" h-[20%]">
            Today's Workout:
            <div className=" h-[6rem] bg-white shadow-md border-none rounded-md p-4">
              {loading ? (
                <WorkoutSkeleton />
              ) : todaysWorkout.length > 0 ? (
                <WorkoutCard
                  date={todaysDate}
                  exerciseCount={todaysWorkout.length}
                  href={`tracker/exercise?date=${encodeURIComponent(
                    todaysDate
                  )}`}
                />
              ) : (
                <p>No exercises for today</p>
              )}
            </div>
          </div>
          <div className=" h-full">
            Upcoming Workouts:
            <div className="flex flex-col p-5 gap-6 h-[39rem] bg-white shadow-md border-none rounded-md overflow-y-auto">
              {loading ? (
                <>
                  <WorkoutSkeleton />
                  <WorkoutSkeleton />
                  <WorkoutSkeleton />
                  <WorkoutSkeleton />
                  <WorkoutSkeleton />
                  <WorkoutSkeleton />
                  <WorkoutSkeleton />
                </>
              ) : (
                tomorrowWorkouts.map((date) => (
                  <WorkoutCard
                    date={date}
                    exerciseCount={groupedByDate[date].length}
                    href={`tracker/exercise?date=${encodeURIComponent(date)}`}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        <div className=" w-[30%]">
          Achievements:
          <div className=" h-[48rem] bg-white shadow-md border-none rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Tracker);
