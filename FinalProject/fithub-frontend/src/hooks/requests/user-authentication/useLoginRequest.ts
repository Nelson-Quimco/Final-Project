import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { setCookie, removeCookie } from "@/lib/utils/cookies";
import { User, UserRes } from "@/constants/userTypes";
import { useRouter } from "next/navigation";

const axiosReq = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_URL}` });
const useLoginRequest = () => {
  const router = useRouter();

  const [data, setData] = useState<User[]>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMesage, setPasswordMessage] = useState("");
  const [user, setUser] = useState<UserRes | null>(null);

  const getAccounts = useCallback(async () => {
    try {
      const res = await axiosReq.get("/user-authentication");
      setData(res.data.data.users);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const loginAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const body = {
        username: username,
        password: password,
      };
      if (username === "") {
        setUsernameValid(false);
        setUsernameMessage("Please enter a username.");
      } else {
        setUsernameValid(true);
      }

      if (password === "") {
        setPasswordValid(false);
        setPasswordMessage(" Please enter a password.");
      } else {
        setPasswordValid(true);
      }

      const res = await axiosReq.post("/user-authentication/login", body, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.statusCode === 200) {
        setCookie("token", res.data.token);
        setCookie("user", JSON.stringify(res.data.user));
        router.push("/dashboard");
      } else {
        setPasswordValid(false);
        setUsernameValid(false);
        setPasswordMessage("Invalid Username or Password");
        setUsernameMessage("Invalid Username or Password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = useCallback(async (userId: number) => {
    try {
      const res = await axiosReq.get(`/user-authentication/${userId}`);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAccounts();
  }, []);

  const memoizedValue = useMemo(() => {
    return { user, data };
  }, [user, data]);

  return {
    ...memoizedValue,
    data,
    loginAccount,
    setUsername,
    setPassword,
    getAccounts,
    getUserById,
    usernameValid,
    passwordValid,
    usernameMessage,
    passwordMesage,
    user,
  };
};

export default useLoginRequest;
