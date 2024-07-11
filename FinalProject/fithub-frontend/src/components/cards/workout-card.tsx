import Link from "next/link";
import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";

interface Props {
  date: string;
  exerciseCount: number;
  href: string;
  linked?: boolean;
}

const WorkoutCard = (props: Props) => {
  const { date, exerciseCount, href, linked = true } = props;

  return (
    <div className="p-3 border rounded-md w-full flex">
      <div className="w-[90%]">
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
      <div className="flex items-center gap-3">
        <button>
          <div className="border-none rounded-md bg-blue p-1">
            <BiEditAlt size={25} className="text-white" />
          </div>
        </button>
        <button>
          <div className="border-none rounded-md bg-red p-1">
            <FaRegTrashAlt size={25} className="text-white" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;
