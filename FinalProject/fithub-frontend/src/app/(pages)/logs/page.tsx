"use client";
import withAuth from "@/components/auth/withAuth";
import useAddedWorkouts from "@/hooks/requests/tracker/useAddedWorkouts";
import useUserdata from "@/hooks/useUserdata";
import React, { useEffect } from "react";
import "../../../styles/logs.css";
import Button from "@/components/buttons/Button";
import { useRouter } from "next/navigation";

const Logs = () => {
  const { groupedByDate, getAllUserWorkouts } = useAddedWorkouts();

  const user = useUserdata();
  const router = useRouter();

  useEffect(() => {
    if (user?.userId) {
      getAllUserWorkouts(user.userId);
    }
  }, [user?.userId]);

  const currentDate = new Date();

  const filteredDates = Object.keys(groupedByDate)
    .filter((date) => new Date(date) < new Date(currentDate))
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  useEffect(() => {
    console.log(groupedByDate);
  }, [groupedByDate]);

  return (
    <div className="flex flex-col gap-6">
      <div className="font-bold text-[40px]">Progress Logs:</div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Score</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDates.map((date) => {
              const exercises = groupedByDate[date];
              const totalExercises = exercises.length;
              const completedExercises = exercises.filter(
                (exercise) => exercise.isComplete
              ).length;
              const status =
                completedExercises === totalExercises ? "Completed" : "Failed";

              return (
                <tr key={date} className="font-semibold">
                  <td>
                    <p>{new Date(date).toLocaleDateString()}</p>
                  </td>
                  <td>
                    <p>
                      {completedExercises}/{totalExercises}
                    </p>
                  </td>

                  <td className="flex justify-center border-none items-center p-3">
                    <p
                      className={`${
                        status === "Completed" ? "bg-successGreen" : "bg-red"
                      } w-[50%] border-none rounded-full`}
                    >
                      {status}
                    </p>
                  </td>
                  <td>
                    <button
                      className="text-white border-none rounded-md bg-blue p-2"
                      onClick={() => {
                        router.push(
                          `logs/exercise?date=${encodeURIComponent(date)}`
                        );
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withAuth(Logs);
