"use client";
import withAuth from "@/components/auth/withAuth";
import useAddedWorkouts from "@/hooks/requests/tracker/useAddedWorkouts";
import useUserdata from "@/hooks/useUserdata";
import React, { useEffect } from "react";
import "../../../styles/logs.css";

const Logs = () => {
  const { groupedByDate, getByDate, getAllUserWorkouts } = useAddedWorkouts();

  const user = useUserdata();

  useEffect(() => {
    if (user?.userId) {
      getAllUserWorkouts(user.userId);
    }
  }, [user?.userId]);

  const temp = Object.keys(groupedByDate).map((date) =>
    console.log(groupedByDate[date])
  );

  useEffect(() => {
    console.log(temp);
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
            </tr>
          </thead>
          <tbody>
            {" "}
            {Object.keys(groupedByDate).map((date) => {
              const exercises = groupedByDate[date];
              const totalExercises = exercises.length;
              const completedExercises = exercises.filter(
                (exercise) => exercise.isComplete
              ).length;
              const status =
                completedExercises === totalExercises ? "Completed" : "Failed";

              return (
                <tr key={date}>
                  <td>
                    <p>{new Date(date).toLocaleDateString()}</p>
                  </td>
                  <td>
                    <p>
                      {completedExercises}/{totalExercises}
                    </p>
                  </td>

                  <td className="">
                    <p
                      className={`${
                        status === "Completed" ? "bg-successGreen" : "bg-red"
                      } w-[50%] border-none rounded-full`}
                    >
                      {status}
                    </p>
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
