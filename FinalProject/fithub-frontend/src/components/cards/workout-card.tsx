import Link from "next/link";
import React from "react";

interface Props {
  date: string;
  exerciseCount: number;
  href: string;
  key?: "number" | "string";
}

const WorkoutCard = (props: Props) => {
  const { date, exerciseCount, href, key } = props;

  return (
    <div className="p-3 border rounded-md">
      <Link href={href} key={key}>
        <p className="font-bold text-[15px]">Exercise for {date}</p>
        <p>{exerciseCount} Exercise/s</p>
      </Link>
    </div>
  );
};

export default WorkoutCard;
