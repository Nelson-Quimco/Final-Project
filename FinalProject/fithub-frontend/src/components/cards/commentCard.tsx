import userId from "@/app/(pages)/forum/user/[userId]/page";
import useComment from "@/hooks/requests/comment/useComment";
import useUserProfile from "@/hooks/requests/user-profile/useUserProfile";
import useUserdata from "@/hooks/useUserdata";
import React, { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiEditLine } from "react-icons/ri";

interface Props {
  postId: number;
  username: string;
  content: string;
  likes: number;
  userId: number;
  commentId: number;
}

const CommentCard = (props: Props) => {
  const { username, content, likes, userId, commentId, postId } = props;
  const [editMode, setEditMode] = useState(false);
  const [newComment, setNewComment] = useState(content);

  const user = useUserdata();
  const { editComment, likeComment, commentLikes, setCommentLikes } =
    useComment();

  useEffect(() => {
    setCommentLikes(likes);
  }, [likes]);
  let userLoggedId: number;

  if (user) {
    userLoggedId = user.userId;
  }

  const editCommentHandler = (commentId: number, content: string) => {
    editComment(commentId, content);
  };

  const likeHandler = (commentId: number, userId: number) => {
    likeComment(commentId, userId);
  };

  return (
    <>
      <div className="flex flex-col w-full h-full p-3 gap-3 border-none rounded-lg">
        <div className="flex justify-between font-semibold text-[15px]">
          <div>{username}</div>
          <div
            className={`flex gap-2 ${user?.userId === userId ? "" : "hidden"}`}
          >
            <RiEditLine
              size={20}
              className="hover:cursor-pointer"
              onClick={() => setEditMode((prev) => !prev)}
            />
            <FaRegTrashAlt size={20} className="hover:cursor-pointer" />
          </div>
        </div>
        {editMode ? (
          <form
            onSubmit={() => editCommentHandler(commentId, newComment)}
            className="flex flex-col gap-2"
          >
            <textarea
              value={newComment}
              className="border p-1 rounded-md"
              style={{ resize: "none" }}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="self-end border-none rounded-md text-white bg-blue p-1 w-[6rem]"
              type="submit"
            >
              Submit
            </button>
          </form>
        ) : (
          <div> {content}</div>
        )}
        <div className="flex items-center gap-1 mt-6">
          <AiOutlineLike
            size={20}
            onClick={() => likeHandler(commentId, userLoggedId)}
            className="hover:cursor-pointer"
          />
          {commentLikes}
        </div>
      </div>
      <hr className="w-[98%] self-center" />
    </>
  );
};

export default CommentCard;
