import React from "react";
import { Button } from "..";
import useAddedWorkouts from "@/hooks/requests/tracker/useAddedWorkouts";
import useUserdata from "@/hooks/useUserdata";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  handleDelete: () => void;
}

const DeleteWorkoutModal = (props: Props) => {
  const { isOpen, onClose, handleDelete } = props;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="flex flex-col items-center border rounded-[15px] bg-offWhite bg-opacity-100 w-[40rem] h-[20rem] z-20 justify-center gap-8 p-[4rem] my-10">
        <p className=" text-left font-bold text-[25px]">Delete Workout</p>
        <div className="flex flex-col gap-8 items-center">
          <p className="text-[20px]">
            Are You sure you want to delete this Workout?
          </p>
          <div className="flex gap-8">
            <Button name="Yes" onClick={handleDelete} />
            <Button name="No" onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteWorkoutModal;
