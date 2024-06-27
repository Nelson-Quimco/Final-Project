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

      <Button
        name="Reset Password"
        onClick={() => setIsmodalOpen(true)}
      ></Button>

      <div>{user?.username}</div>
    </div>
  );
};

export default withAuth(Profile);
