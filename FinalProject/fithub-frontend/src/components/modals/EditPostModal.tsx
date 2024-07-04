import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import Input from "../input/Input";
import Button from "../buttons/Button";
import useForumRequest from "@/hooks/requests/forum/useForumRequest";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  title: string;
  content: string;
}

const EditPostModal = (props: Props) => {
  const { isOpen, onClose, title, content, postId } = props;
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const { editPost } = useForumRequest();

  const handleSubmitEdit = () => {
    editPost(postId, newTitle, newContent);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="flex relative flex-col border rounded-[15px] bg-offWhite bg-opacity-100 w-[60rem] h-[80%] z-20 justify-center gap-8 p-[1rem] my-10">
        <IoIosCloseCircle
          className="absolute top-2 right-2 cursor-pointer"
          size={30}
          onClick={onClose}
        />
        <div>
          <p className="font-bold">Edit Post </p>
        </div>
        <form
          className="h-full flex flex-col gap-3"
          onSubmit={handleSubmitEdit}
        >
          <Input
            placeholder="Title......"
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
          />
          <textarea
            placeholder="What's On Your Mind"
            className="h-full p-3 border rounded-md"
            style={{ resize: "none" }}
            onChange={(e) => setNewContent(e.target.value)}
            value={newContent}
          ></textarea>
          <div className="self-end">
            <Button height="3rem" type="submit" name="Post"></Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
