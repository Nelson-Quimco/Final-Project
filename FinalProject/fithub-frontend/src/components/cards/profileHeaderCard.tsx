import React from "react";
import Button from "../buttons/Button";
import { FaUserCircle } from "react-icons/fa";

interface Props {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  openEditModal: () => void;
  openResetModal: () => void;
}

const ProfileHeaderCard = (props: Props) => {
  const {
    firstname,
    lastname,
    username,
    email,
    openEditModal,
    openResetModal,
  } = props;

  return (
    <div className="flex w-full border-none rounded-lg shadow-md bg-offWhite">
      <div className=" h-full w-[20%] flex flex-col items-center gap-3 p-2">
        <FaUserCircle size={80} className="text-blue" />
        <Button name="Edit Profile" onClick={openEditModal}></Button>
        <Button
          name="Reset Password"
          onClick={openResetModal}
          className=""
        ></Button>
      </div>
      <div className="flex flex-col w-[80%] gap-10 p-10 text-[20px]">
        <div className="flex justify-between">
          <div className="flex flex-col justify-start gap-6 w-full font-bold">
            <p>
              Firstname:
              <span className="font-normal text-[18px] ml-[10px]">
                {firstname}
              </span>
            </p>
            <p>
              Username:
              <span className=" font-normal text-[18px] ml-[10px]">
                {username}
              </span>
            </p>
          </div>
          <div className="flex flex-col justify-start gap-6 w-full font-bold">
            <p>
              Lastname:
              <span className=" font-normal text-[18px] ml-[10px]">
                {lastname}
              </span>
            </p>
            <p>
              Email:
              <span className=" font-normal text-[18px] ml-[10px]">
                {email}
              </span>
            </p>
          </div>
        </div>
        <div className="text-center"></div>
      </div>
    </div>
  );
};

export default ProfileHeaderCard;
