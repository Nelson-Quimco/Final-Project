import axios from "axios";
import React, { useState } from "react";

const axiosReq = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_URL}` });
const useRegisterRequest = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const registerAccount = async () => {
    try {
      const res = await axiosReq.post("/user-authentication/signUp");
    } catch (error) {
      console.log(error);
    }
  };
  return {};
};

export default useRegisterRequest;
