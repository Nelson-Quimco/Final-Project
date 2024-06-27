import React, { useState } from "react";
import axios from "axios";

const axiosReq = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_URL}` });
const useResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const resetPassword = async (id: number) => {
    try {
      const body = {
        password: newPassword,
      };

      const res = await axiosReq.patch(
        `user-authentication/${id}/reset-password`,
        body,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    resetPassword,
    setNewPassword,
    setOldPassword,
    oldPassword,
    newPassword,
  };
};

export default useResetPassword;
