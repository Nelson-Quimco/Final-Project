"use client";
import React, { useState } from "react";
import Button from "@/components/buttons/Button";
import Input from "@/components/input/Input";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMesage, setPasswordMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    // if (username === "" || password === "") {
    //   setUsernameMessage("Please enter a username.");
    //   setPasswordMessage(" Please enter a password.");
    //   return;
    // }
  };

  return (
    <>
      <h1 className="text-[30px] font-bold">
        FiT <span className="text-red">HUB</span>
      </h1>
      <h1 className="font-bold text-[25px]">Sign In</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-10 w-full *:w-full"
      >
        <div>
          <p className="font-bold text-[20px]">Username</p>
          <div
            className={`border-[2px] ${
              usernameValid ? "border-black" : "border-red"
            } rounded-md`}
          >
            <Input
              width="100%"
              height="55px"
              border="none"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {!usernameValid && (
            <p className="text-red text-sm mt-1">{usernameMessage}</p>
          )}
        </div>
        <div className="mb-12">
          <p className="font-bold text-[20px]">Password</p>
          <div
            className={`border-[2px] ${
              passwordValid ? "border-black" : "border-red"
            } rounded-md`}
          >
            <Input
              width="100%"
              height="55px"
              border="none"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!passwordValid && (
            <p className="text-red text-sm mt-1">{passwordMesage}</p>
          )}
        </div>
        <Button name="Login" width="13rem" type="submit" />
      </form>
    </>
  );
};

export default Login;
