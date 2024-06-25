import React from "react";
import Button from "../buttons/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmationModal = (props: Props) => {
  const { isOpen, onClose } = props;

  if (!isOpen) return null;

  return (
    <div className="border border-black flex justify-center h-[100vh] z-10">
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="flex flex-col items-center border rounded-[15px] bg-offWhite bg-opacity-85 w-[30%] h-[80%] z-20 justify-center gap-8 p-[4rem] my-10">
        <Button name="Yes" />
        <Button name="No" />
      </div>
    </div>
  );
};

export default ConfirmationModal;
