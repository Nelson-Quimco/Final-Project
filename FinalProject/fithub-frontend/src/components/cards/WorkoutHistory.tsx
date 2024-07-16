import useAddedWorkouts from "@/hooks/requests/tracker/useAddedWorkouts";
import useUserdata from "@/hooks/useUserdata";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import "../../styles/logs.css";

const WorkoutHistory = () => {
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
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  useEffect(() => {
    console.log(groupedByDate);
  }, [groupedByDate]);

  return (
    <div className="flex flex-col gap-6">
      <button
        className="text-white text-[15px] p-2 bg-blue w-[10rem] rounded-lg self-end font-semibold"
        onClick={() => router.push("/logs")}
      >
        View More
      </button>
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
                      } w-[50%] border-none rounded-full shadow-sm`}
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

export default WorkoutHistory;
