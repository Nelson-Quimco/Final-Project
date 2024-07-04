import React from "react";
import Button from "../buttons/Button";
import { AiOutlineLike } from "react-icons/ai";
import { RiEditLine } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { formatDateNormal } from "@/lib/functions/dateFormatter";

interface Props {
  username: string;
  date: Date;
  title: string;
  content: string;
  likes: number;
}

const PostCard = (props: Props) => {
  const { title, content, date, username, likes } = props;

  const formattedDate = formatDateNormal(date);
  return (
    <>
      <div className="flex flex-col border-none rounded-md shadow-md p-6 gap-6 bg-white ">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <p>{username}</p>
            <p>{formattedDate}</p>
          </div>
          <div className="flex gap-3">
            <RiEditLine size={20} />
            <FaRegTrashAlt size={20} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-bold text-[25px]">{title}</div>
          <div>
            <p>{content}</p>
          </div>
          <button>
            <AiOutlineLike size={20} />
            {likes}
          </button>
        </div>
      </div>
      <hr className="w-full mt-6 " />
    </>
  );
};

export default PostCard;
