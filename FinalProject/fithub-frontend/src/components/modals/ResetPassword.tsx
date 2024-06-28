import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import Button from "../buttons/Button";
import Input from "../input/Input";
import useUserdata from "@/hooks/useUserdata";
import { removeCookie } from "@/lib/utils/cookies";
import { useRouter } from "next/navigation";
import { IoIosCloseCircle } from "react-icons/io";
import { toast } from "react-toastify";
import axios from "axios";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const axiosReq = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_URL}` });

const ResetPasswordModal = (props: Props) => {
  const { isOpen, onClose } = props;

  const user = useUserdata();
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const resetPassword = async (id: number) => {
    try {
      const response = await axiosReq.patch(
        `/user-authentication/${id}/reset-password`,
        {
          password: newPassword,
        }
      );
      return response.data.statusCode; // return the status code directly
    } catch (error) {
      if (error) {
        console.error(error);
        return error;
      } else {
        console.error(error);
        return 500; // default to 500 if no response status is available
      }
    }
  };

  const notif = () =>
    toast("Password reset successfully, Please login with the new password");

  const error = () =>
    toast.error(
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user?.password === oldPassword) {
      console.log("Password matches");

      const statusCode = await resetPassword(user?.userId);
      console.log("Status code:", statusCode);

      if (statusCode === 200) {
        removeCookie("token");
        removeCookie("user");
        router.replace("/login");
        resetPassword(user?.userId);
        notif();
        console.log("yeah");
      } else if (statusCode === 400) {
        console.log("invalid pass");
        error();
      } else {
        console.error("An unexpected error occurred.");
      }
    } else {
      console.log("Invalid Password");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="flex relative flex-col items-center border rounded-[15px] bg-offWhite bg-opacity-100 w-[30rem] h-[40rem] z-20 justify-center gap-8 p-[1rem] my-10">
        <IoIosCloseCircle
          className="absolute top-2 right-2 cursor-pointer"
          size={30}
          onClick={onClose}
        />
        <div>
          <Logo />
        </div>
        <div className="">
          <form
            action="patch"
            onSubmit={handleReset}
            className="flex flex-col gap-8 items-center"
          >
            <div className="my-[5rem]">
              <div className="mb-[2rem]">
                <p className="font-bold">Password:</p>
                <Input
                  width="20rem"
                  onChange={(e) => setOldPassword(e.target.value)}
                  value={oldPassword}
                />
              </div>
              <div>
                <p className="font-bold">New Password:</p>
                <Input
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                />
              </div>
            </div>
            <Button
              name="Reset Password"
              type="submit"
              width="12rem"
              height="3rem"
            ></Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
