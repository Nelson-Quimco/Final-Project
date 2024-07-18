import React, { useEffect, useState } from "react";
import Button from "../buttons/Button";
import { AiOutlineLike } from "react-icons/ai";
import { RiEditLine } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { formatDateNormal } from "@/lib/functions/dateFormatter";
import useUserdata from "@/hooks/useUserdata";
import useForumRequest from "@/hooks/requests/forum/useForumRequest";

interface Props {
  username: string;
  date: Date;
  title: string;
  content: string;
  likes: number;
  postId: number;
  userId: number;
  onEdit: () => void; // Add the onEdit prop
  onDelete: () => void;
}

const PostCard = (props: Props) => {
  const {
    title,
    content,
    date,
    username,
    likes,
    onEdit,
    onDelete,
    userId,
    postId,
  } = props;

  const user = useUserdata();
  const { likePost, postLikes, setPostLikes } = useForumRequest();

  useEffect(() => {
    setPostLikes(likes);
  }, [likes]);

  let userLoggedId = 0;

  if (user) {
    userLoggedId = user.userId;
  }
  const handleLikesPost = (postId: number, userId: number) => {
    likePost(postId, userId);
  };

  const formattedDate = formatDateNormal(date);

  return (
    <>
      <div className="flex flex-col border-none rounded-md shadow-md p-6 gap-6 bg-offWhite ">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-bold text-[20px]">{username}</p>
            <p className="text-[12px]">{formattedDate}</p>
          </div>
          <div
            className={`flex gap-3 ${user?.userId === userId ? "" : "hidden"}`}
          >
            <RiEditLine
              size={20}
              onClick={onEdit}
              className="hover:cursor-pointer"
            />
            <FaRegTrashAlt
              size={20}
              onClick={onDelete}
              className="hover:cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-bold text-[22px]">{title}</div>
          <div className="w-full flex flex-col gap-6">
            <p className="w-full whitespace-pre-line break-words text-justify">
              {content}
            </p>
            <div className="flex items-center gap-2">
              <button>
                <AiOutlineLike
                  size={30}
                  onClick={() => handleLikesPost(postId, userLoggedId)}
                  className="hover:cursor-pointer"
                />
              </button>
              Likes: ({postLikes})
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
