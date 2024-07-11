import Link from "next/link";
import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";

interface Props {
  date: string;
  exerciseCount: number;
  href: string;
  linked?: boolean;
  noAction?: boolean;
  handleDelete?: () => void;
  handleEdit?: () => void;
}

const WorkoutCard = (props: Props) => {
  const {
    handleEdit,
    handleDelete,
    noAction,
    date,
    exerciseCount,
    href,
    linked = true,
  } = props;

  return (
    <div className="p-3 border rounded-md w-full flex justify-between">
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
      <div
        className={`flex items-center justify-end gap-3 ${
          noAction ? "hidden" : ""
        }`}
      >
        <button onClick={handleDelete}>
          <div className="border-none rounded-md bg-red p-1">
            <FaRegTrashAlt size={25} className="text-white" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;
