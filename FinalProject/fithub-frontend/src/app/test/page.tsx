"use client";
import User from "@/constants/userTypes";
import { getCookie } from "@/lib/utils/cookies";
import { useEffect, useState } from "react";

const Test = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userCookie = getCookie("user");
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);

  return (
    <>
      <div>{user?.firstName}</div>
    </>
  );
};

export default Test;
