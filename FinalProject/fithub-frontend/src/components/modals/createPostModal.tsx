import React, { useEffect, useState } from "react";
import Input from "../input/Input";
import Button from "../buttons/Button";
import useForumRequest from "@/hooks/requests/forum/useForumRequest";
import useUserdata from "@/hooks/useUserdata";
import { IoIosCloseCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal = (props: Props) => {
  const { isOpen, onClose } = props;
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const user = useUserdata();
  const userId = user?.userId;

  const { createPost, yourPostId, loading } = useForumRequest();

  const loadingToast = () => toast("Posting");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPost(userId, title, content);
    // loadingToast();
  };

  useEffect(() => {
    if (yourPostId) {
      router.push(`/forum/${yourPostId}`);
      onClose();
    }
  }, [yourPostId]);

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
          <p className="font-bold">Create New Posts</p>
        </div>
        <form className="h-full flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input
            placeholder="Title......"
            onChange={(e) => setTitle(e.target.value)}
            required={true}
          />
          <textarea
            placeholder="What's On Your Mind"
            className="h-full p-3 border rounded-md"
            style={{ resize: "none" }}
            onChange={(e) => setContent(e.target.value)}
            required={true}
          ></textarea>
          <div className="self-end">
            <Button height="3rem" type="submit" name="Post"></Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
