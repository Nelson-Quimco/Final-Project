"use client";
import { User } from "@/constants/userTypes";
import { getCookie } from "@/lib/utils/cookies";
import React, { useEffect, useMemo, useState } from "react";

const useUserdata = () => {
  const [user, setUser] = useState<User | null>(null);

  useMemo(() => {
    const userCookie = getCookie("user");
    if (userCookie) {
      try {
        setUser(JSON.parse(userCookie));
      } catch (error) {
        console.error("Failed to parse user cookie", error);
      }
    }
  }, []);
  return user;
};

export default useUserdata;
