import { User, UserRes } from "@/constants/userTypes";
import { setCookie } from "@/lib/utils/cookies";
import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";

const useUserProfile = () => {
  const [userData, setUserDate] = useState<UserRes | null>(null);

  const changeUserProfile = useCallback(
    async (
      id: number,
      firstname: string,
      lastname: string,
      username: string,
      email: string
    ) => {
      try {
        const body = {
          firstName: firstname,
          lastName: lastname,
          username: username,
          email: email,
        };

        await axios.patch(
          `http://localhost:3000/user-authentication/${id}/user-profile`,
          body
        );

        setCookie("user", JSON.stringify(body));
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const getUserInformation = useCallback(async (id: number) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/user-authentication/${id}`
      );

      setUserDate(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const values = useMemo(() => {
    return { userData };
  }, [userData]);

  return { ...values, changeUserProfile, getUserInformation };
};

export default useUserProfile;
