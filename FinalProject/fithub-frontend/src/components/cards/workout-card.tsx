import Link from "next/link";
import React from "react";

interface Props {
  date: string;
  exerciseCount: number;
  href: string;
  linked?: boolean;
}

const WorkoutCard = (props: Props) => {
  const { date, exerciseCount, href, linked = true } = props;

  return (
    <div className="p-3 border rounded-md">
      {linked ? (
        <Link href={href}>
          <p className="font-bold text-[15px]">Exercise for {date}</p>
          <p>{exerciseCount} Exercise/s</p>
        </Link>
      ) : (
        <div>
          <p className="font-bold text-[15px]">Exercise for {date}</p>
          <p>{exerciseCount} Exercise/s</p>
        </div>
      )}
    </div>
  );
};

export default WorkoutCard;
