"use client";
import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import Button from "../buttons/Button";
import useComment from "@/hooks/requests/comment/useComment";
import useUserdata from "@/hooks/useUserdata";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
}

const CreateCommentModal = (props: Props) => {
  const { isOpen, onClose, postId } = props;
  const [comment, setComment] = useState("");

  const { createComment } = useComment();
  const user = useUserdata();

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user?.userId) {
      console.log("comment submitted");
      createComment(postId, user?.userId, comment);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="flex relative flex-col rounded-[15px] bg-offWhite bg-opacity-100 w-[60rem] h-[50%] z-20 justify-center gap-8 p-[1rem] my-10">
        <IoIosCloseCircle
          className="absolute top-2 right-2 cursor-pointer"
          size={30}
          onClick={onClose}
        />
        <div>
          <p className="font-bold">Comment on this post</p>
        </div>
        <form
          className="h-full flex flex-col gap-3"
          onSubmit={handleSubmitComment}
        >
          <textarea
            placeholder="Comment Your thought......"
            className="h-full p-3 border rounded-md"
            style={{ resize: "none" }}
            onChange={(e) => setComment(e.target.value)}
            required={true}
          ></textarea>
          <div className="self-end">
            <Button height="3rem" type="submit" name="Post" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCommentModal;
