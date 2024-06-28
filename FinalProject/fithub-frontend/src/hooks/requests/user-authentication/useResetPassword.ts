import { useState } from "react";
import axios from "axios";

const axiosReq = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_URL}` });
const useResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [statusCode, setStatusCode] = useState(null);

  const resetPassword = async (id: number) => {
    try {
      const response = await axiosReq.patch(
        `/user-authentication/${id}/reset-password`,
        {
          password: newPassword,
        }
      );
      setStatusCode(response.data.statusCode);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  return {
    resetPassword,
    setOldPassword,
    setNewPassword,
    oldPassword,
    newPassword,
    statusCode,
  };
};

export default useResetPassword;
