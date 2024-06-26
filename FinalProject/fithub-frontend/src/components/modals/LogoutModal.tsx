"use client";
import React from "react";
import Button from "../buttons/Button";
import { useLogoutContext } from "@/providers/modalContext";
import { removeCookie } from "@/lib/utils/cookies";
import { useRouter } from "next/navigation";

interface Props {
  onClose?: () => void;
}

const LogoutModal = (props: Props) => {
  const { isOpen, setIsOpen } = useLogoutContext();
  const router = useRouter();

  const logout = async () => {
    removeCookie("token");
    removeCookie("user");
    router.push("/login");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="flex flex-col items-center border rounded-[15px] bg-offWhite bg-opacity-100 w-[40rem] h-[20rem] z-20 justify-center gap-8 p-[4rem] my-10">
        <p className=" text-left font-bold text-[25px]">LOG OUT</p>
        <div className="flex flex-col gap-8 items-center">
          <p className="text-[20px]">Are you sure you want to Log out?</p>
          <div className="flex gap-8">
            <Button name="Yes" onClick={() => logout()} />
            <Button name="No" onClick={() => setIsOpen((prev) => !prev)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
