"use client";
import useUserdata from "@/hooks/useUserdata";
import React from "react";
import withAuth from "@/components/auth/withAuth";
import ResetPassword from "@/components/modals/ResetPassword";

const Profile = () => {
  const user = useUserdata();

  return (
    <div>
      <ResetPassword></ResetPassword>
    </div>
  );
};

export default withAuth(Profile);
