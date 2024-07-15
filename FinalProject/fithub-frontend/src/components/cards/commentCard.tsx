import useComment from "@/hooks/requests/comment/useComment";
import useUserProfile from "@/hooks/requests/user-profile/useUserProfile";
import React, { useEffect, useState } from "react";

interface Props {
  username: string;
  content: string;
  likes: number;
}

const CommentCard = (props: Props) => {
  const { username, content, likes } = props;

  return (
    <div className="w-full h-full p-3  border-none shadow-md rounded-lg">
      <div className="font-semibold text-[20px]">{username}</div>
      <div>{content}</div>
      <div>{likes}</div>
    </div>
  );
};

export default CommentCard;
