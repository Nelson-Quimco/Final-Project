import React, { useState } from "react";
import Button from "../buttons/Button";
import { AiOutlineLike } from "react-icons/ai";
import { RiEditLine } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { formatDateNormal } from "@/lib/functions/dateFormatter";
import EditPostModal from "../modals/EditPostModal";
import useUserdata from "@/hooks/useUserdata";
import DeletePostModal from "../modals/deletePostModal";
import useForumRequest from "@/hooks/requests/forum/useForumRequest";

interface Props {
  username: string;
  date: Date;
  title: string;
  content: string;
  likes: number;
  postId: number;
  userId: number;
}

const PostCard = (props: Props) => {
  const { title, content, date, username, likes, postId, userId } = props;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const formattedDate = formatDateNormal(date);

  const { likePost } = useForumRequest();

  const handleLikePost = () => {
    likePost(postId);
  };

  const user = useUserdata();
  return (
    <>
      <div className="flex flex-col border-none rounded-md shadow-md p-6 gap-6 bg-white ">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-bold text-[20px]">{username}</p>
            <p className="text-[14px]">{formattedDate}</p>
          </div>
          <div
            className={`flex gap-3 ${user?.userId === userId ? "" : "hidden"}`}
          >
            <RiEditLine
              size={20}
              onClick={() => setIsEditModalOpen(true)}
              className="hover:cursor-pointer hover:text-blue"
            />
            <FaRegTrashAlt
              size={20}
              className="hover:cursor-pointer hover:text-red"
              onClick={() => setIsDeleteModalOpen(true)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-bold text-[25px]">{title}</div>
          <div className="w-full flex flex-col gap-6">
            <p className="w-full whitespace-pre-line break-words text-justify">
              {content}
            </p>
            <div className="flex items-center gap-2">
              <button>
                <AiOutlineLike size={30} onClick={handleLikePost} />
              </button>
              Likes: ({likes})
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full mt-6 " />

      <DeletePostModal
        isOpen={isDeleteModalOpen}
        postId={postId}
        onClose={() => setIsDeleteModalOpen(false)}
      />

      <EditPostModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        postId={postId}
        title={title}
        content={content}
      />
    </>
  );
};

export default PostCard;
