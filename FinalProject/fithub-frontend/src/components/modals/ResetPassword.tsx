import React from "react";
import Logo from "../Logo";
import Button from "../buttons/Button";
import Input from "../input/Input";
import useResetPassword from "@/hooks/user-authentication/useResetPassword";
import useUserdata from "@/hooks/useUserdata";
import { setCookie } from "@/lib/utils/cookies";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
  const user = useUserdata();
  const router = useRouter();
  const {
    resetPassword,
    setNewPassword,
    setOldPassword,
    oldPassword,
    newPassword,
  } = useResetPassword();

  console.log(user?.password);

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user?.password === oldPassword) {
      console.log("yeeaaahhhh");
      if (user?.userId === undefined) {
        console.log("userId is undefined");
      } else {
        console.log(user?.userId);
        resetPassword(user?.userId);
        router.replace("/login");
      }
    } else {
      console.log("Noooooo");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="flex flex-col items-center border rounded-[15px] bg-offWhite bg-opacity-100 w-[30rem] h-[40rem] z-20 justify-center gap-8 p-[1rem] my-10">
        <div>
          <Logo />
        </div>
        <div className="">
          <form
            action="patch"
            onSubmit={handleReset}
            className="flex flex-col gap-8 items-center"
          >
            <div>
              <div>
                <p className="font-bold">Password:</p>
                <Input
                  onChange={(e) => setOldPassword(e.target.value)}
                  value={oldPassword}
                />
              </div>
              <div>
                <p className="font-bold">New Password:</p>
                <Input
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                />
              </div>
            </div>
            <Button
              name="Reset Password"
              type="submit"
              width="15rem"
              height="3rem"
            ></Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
