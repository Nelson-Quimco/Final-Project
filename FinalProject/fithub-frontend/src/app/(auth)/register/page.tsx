"use client";

import React, { useState } from "react";
import Button from "@/components/buttons/Button";
import Input from "@/components/input/Input";
import { useRouter } from "next/navigation";
import useRegisterRequest from "@/hooks/user-authentication/useRegisterRequest";
import axios from "axios";
import User from "@/constants/userTypes";

const axiosReq = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_URL}` });
const Register = () => {
  const [data, setData] = useState<User[]>([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [firstnameValid, setFirstnameValid] = useState(true);
  const [lastnameValid, setLastnameValid] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPassValid, setConfirmPassValid] = useState(true);

  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");

  const router = useRouter();

  const registerAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;
    setFirstnameValid(true);
    setLastnameValid(true);
    setUsernameValid(true);
    setEmailValid(true);
    setPasswordValid(true);
    setConfirmPassValid(true);

    setFirstnameError("");
    setLastnameError("");
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPassError("");

    if (firstname === "") {
      setFirstnameValid(false);
      setFirstnameError("Please enter your first name.");
      isValid = false;
    }

    if (lastname === "") {
      setLastnameValid(false);
      setLastnameError("Please enter your last name.");
      isValid = false;
    }

    if (username === "") {
      setUsernameValid(false);
      setUsernameError("Please enter a username.");
      isValid = false;
    }

    if (email === "") {
      setEmailValid(false);
      setEmailError("Please enter your email address.");
      isValid = false;
    }

    if (password === "") {
      setPasswordValid(false);
      setPasswordError("Please enter a password.");
      isValid = false;
    }

    if (confirmPass === "") {
      setConfirmPassValid(false);
      setConfirmPassError("Please confirm your password.");
      isValid = false;
    } else if (password !== confirmPass) {
      setConfirmPassValid(false);
      setConfirmPassError("Passwords do not match.");
      isValid = false;
    }

    // if (isValid) {
    //   router.push("/login");
    // }

    try {
      const body = {
        firstName: firstname,
        lastName: lastname,
        username: username,
        email: email,
        password: password,
      };

      const res = await axiosReq.post("/user-authentication/signUp", body, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-[30px] font-bold">
        FiT <span className="text-red">HUB</span>
      </h1>
      <h1 className="font-bold text-[25px]">Sign Up</h1>
      <form
        onSubmit={registerAccount}
        className="flex flex-col items-center gap-4 w-full *:w-full font-bold"
      >
        <div className="flex gap-6">
          <div className="w-full">
            <p>First Name</p>
            <div
              className={`border-[2px] ${
                !firstnameValid && "border-red"
              } rounded-md`}
            >
              <Input
                onChange={(e) => setFirstname(e.target.value)}
                border="none"
                value={firstname}
              />
            </div>
            {!firstnameValid && (
              <p className="text-red text-sm mt-1">{firstnameError}</p>
            )}
          </div>
          <div className="w-full">
            <p>Last Name</p>
            <div
              className={`border-[2px] ${
                !lastnameValid && "border-red"
              } rounded-md`}
            >
              <Input
                onChange={(e) => setLastname(e.target.value)}
                border="none"
                value={lastname}
              />
            </div>
            {!lastnameValid && (
              <p className="text-red text-sm mt-1">{lastnameError}</p>
            )}
          </div>
        </div>
        <div>
          <p>Username</p>
          <div
            className={`border-[2px] ${
              !usernameValid && "border-red"
            } rounded-md`}
          >
            <Input
              onChange={(e) => setUsername(e.target.value)}
              border="none"
              value={username}
            />
          </div>
          {!usernameValid && (
            <p className="text-red text-sm mt-1">{usernameError}</p>
          )}
        </div>
        <div>
          <p>Email</p>
          <div
            className={`border-[2px] ${!emailValid && "border-red"} rounded-md`}
          >
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              border="none"
              value={email}
            />
          </div>
          {!emailValid && <p className="text-red text-sm mt-1">{emailError}</p>}
        </div>
        <div>
          <p>Password</p>
          <div
            className={`border-[2px] ${
              !passwordValid && "border-red"
            } rounded-md`}
          >
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              border="none"
              value={password}
            />
          </div>
          {!passwordValid && (
            <p className="text-red text-sm mt-1">{passwordError}</p>
          )}
        </div>
        <div>
          <p>Confirm Password</p>
          <div
            className={`border-[2px] ${
              !confirmPassValid && "border-red"
            } rounded-md`}
          >
            <Input
              type="password"
              onChange={(e) => setConfirmPass(e.target.value)}
              border="none"
              value={confirmPass}
            />
          </div>
          {!confirmPassValid && (
            <p className="text-red text-sm mt-1">{confirmPassError}</p>
          )}
        </div>
        <Button name="Register" width="10rem" type="submit" />
      </form>
    </>
  );
};

export default Register;
