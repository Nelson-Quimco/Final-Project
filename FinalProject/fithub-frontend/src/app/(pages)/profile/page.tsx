"use client";
import useUserdata from "@/hooks/useUserdata";
import React, { useState } from "react";
import withAuth from "@/components/auth/withAuth";
import ResetPassword from "@/components/modals/ResetPassword";
import Button from "@/components/buttons/Button";

const Profile = () => {
  const user = useUserdata();
  const [isModalOpen, setIsmodalOpen] = useState(false);

  return (
    <div>
      <ResetPassword
        isOpen={isModalOpen}
        onClose={() => setIsmodalOpen(false)}
      ></ResetPassword>

      {/* <Button
        name="Reset Password"
        onClick={() => setIsmodalOpen(true)}
      ></Button> */}

      <div className="flex w-full border">
        <div className=" h-full w-[20%] flex flex-col items-center gap-3 p-2">
          <div className="border p-10 rounded-full"></div>
          <Button name="Edit Profile"></Button>
          <Button
            name="Reset Password"
            onClick={() => setIsmodalOpen(true)}
            className=""
          ></Button>
        </div>
        <div className="flex flex-col w-[80%] gap-10 p-10 text-[20px]">
          <div className="flex justify-between">
            <div className="flex flex-col justify-start gap-6 w-full">
              <p>
                <span className="font-bold mr-2">Firstname:</span>{" "}
                {user?.firstName}
              </p>
              <p>
                <span className="font-bold mr-2">Username: </span>
                {user?.username}
              </p>
            </div>
            <div className="flex flex-col justify-start gap-6 w-full">
              <p>
                <span className="font-bold mr-2"> Lastname:</span>{" "}
                {user?.lastName}
              </p>
              <p>
                <span className="font-bold mr-2"> Email:</span> {user?.email}
              </p>
            </div>
          </div>
          <div className="text-center">"I love Balls "</div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default withAuth(Profile);
