"use client";
import React, { useEffect, useState } from "react";
import useAddedWorkouts from "@/hooks/requests/tracker/useAddedWorkouts";
import useUserdata from "@/hooks/useUserdata";
import { useRouter } from "next/navigation";
import Link from "next/link";
import withAuth from "@/components/auth/withAuth";
import { Button, WorkoutCard, WorkoutSkeleton } from "@/components";

const Tracker: React.FC = () => {
  const { groupedByDate, getAllUserWorkouts, loading, deleteWorkout } =
    useAddedWorkouts();
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);

  const user = useUserdata();
  const router = useRouter();
  const todaysDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (user?.userId) {
      getAllUserWorkouts(user.userId);
    }
  }, [user?.userId]);

  const todaysWorkout = groupedByDate[todaysDate] || [];
  const upcomingWorkouts = Object.keys(groupedByDate)
    .filter((date) => new Date(date) > new Date(todaysDate))
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const pastWorkouts = Object.keys(groupedByDate).filter(
    (date) => new Date(date) < new Date(todaysDate)
  );

  const handleDelete = async (date: any) => {
    const targetWorkouts = groupedByDate[date];
    console.log(targetWorkouts);

    await Promise.all(
      targetWorkouts.map((x) => deleteWorkout(x.addedExerciseId))
    );

    if (user?.userId) {
      getAllUserWorkouts(user.userId);
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="">
      <Button
        name="Add New Workout"
        width="13rem"
        height="3rem"
        onClick={() => router.push("/tracker/add-workout")}
      />
      <div className="flex w-full gap-10 h-[100%] mt-[2rem]">
        <div className="flex flex-col gap-6 w-[70%]">
          <div className=" h-[20%]">
            Today{`'`}s Workout:
            <div className=" h-[6rem] bg-offWhite shadow-md border-none rounded-md p-4 flex justify-center">
              {loading ? (
                <WorkoutSkeleton />
              ) : todaysWorkout.length > 0 ? (
                <WorkoutCard
                  date={todaysDate}
                  exerciseCount={todaysWorkout.length}
                  href={`tracker/exercise?date=${encodeURIComponent(
                    todaysDate
                  )}`}
                  handleDelete={() => handleDelete(currentDate)}
                />
              ) : (
                <p>No exercises for today</p>
              )}
            </div>
          </div>
          <div className=" h-full">
            Upcoming Workouts:
            <div className="flex flex-col p-5 gap-6 h-[39rem] bg-offWhite shadow-md border-none rounded-md overflow-y-auto">
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
              ) : upcomingWorkouts.length > 0 ? (
                upcomingWorkouts.map((date, index) => (
                  <WorkoutCard
                    key={index}
                    date={date}
                    exerciseCount={groupedByDate[date].length}
                    href={`tracker/exercise?date=${encodeURIComponent(date)}`}
                    handleDelete={() => handleDelete(date)}
                  />
                ))
              ) : (
                <p>You have NO Upcoming Workout</p>
              )}
            </div>
          </div>
        </div>
        <div className=" w-[30%]">
          Past Workouts:
          <Link
            href={"/logs"}
            className="flex flex-col gap-3 h-[48rem] bg-offWhite shadow-md border-none rounded-md p-4 overflow-y-auto"
          >
            {loading ? (
              <>
                <WorkoutSkeleton />
                <WorkoutSkeleton />
                <WorkoutSkeleton />
                <WorkoutSkeleton />
                <WorkoutSkeleton />
                <WorkoutSkeleton />
                <WorkoutSkeleton />
                <WorkoutSkeleton />
                <WorkoutSkeleton />
              </>
            ) : pastWorkouts.length > 0 ? (
              pastWorkouts.map((date, index) => (
                <WorkoutCard
                  linked={false}
                  key={index}
                  date={date}
                  exerciseCount={groupedByDate[date].length}
                  href={`tracker/exercise?date=${encodeURIComponent(date)}`}
                  noAction={true}
                />
              ))
            ) : (
              <p>No past exercises</p>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Tracker);
