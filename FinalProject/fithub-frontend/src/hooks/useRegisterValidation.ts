import React, { useState } from "react";

const useRegisterValidation = () => {
  const [firstnameValid, setFirstnameValid] = useState(true);
  const [lastnameValid, setLastnameValid] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPassValid, setConfirmPassValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setFirstnameValid(true);
    setLastnameValid(true);
    setUsernameValid(true);
    setEmailValid(true);
    setPasswordValid(true);
    setConfirmPassValid(true);

    if (firstname === "") {
      setFirstnameValid(false);
      setErrorMessage("Please enter your first name.");
    }

    if (lastname === "") {
      setLastnameValid(false);
      setErrorMessage("Please enter your last name.");
    }

    if (username === "") {
      setUsernameValid(false);
      setErrorMessage("Please enter a username.");
    }

    if (email === "") {
      setEmailValid(false);
      setErrorMessage("Please enter your email address.");
    }

    if (password === "") {
      setPasswordValid(false);
      setErrorMessage("Please enter a password.");
    }

    if (confirmPass === "") {
      setConfirmPassValid(false);
      setErrorMessage("Please confirm your password.");
    } else if (password !== confirmPass) {
      setConfirmPassValid(false);
      setErrorMessage("Passwords do not match.");
    }
  };
  return {};
};

export default useRegisterValidation;
