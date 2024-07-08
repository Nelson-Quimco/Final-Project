import React from "react";
import Button from "../buttons/Button";
import useForumRequest from "@/hooks/requests/forum/useForumRequest";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  postId: number;
  onDelete: () => void;
}

const DeletePostModal = (props: Props) => {
  const { isOpen, postId, onClose, onDelete } = props;
  const router = useRouter();

  const { deletePost } = useForumRequest();

  const deletedToast = () =>
    toast.success("Post Deleted Successfully.", { position: "top-center" });

  const handleDelete = (id: number) => {
    router.back();
    deletePost(id);
    deletedToast();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="flex flex-col items-center border rounded-[15px] bg-offWhite bg-opacity-100 w-[40rem] h-[20rem] z-20 justify-center gap-8 p-[4rem] my-10">
        <p className=" text-left font-bold text-[25px]">Delete Post</p>
        <div className="flex flex-col gap-8 items-center">
          <p className="text-[20px]">Delete This Post?</p>
          <div className="flex gap-8">
            <Button name="Yes" onClick={() => handleDelete(postId)} />
            <Button name="No" onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;
