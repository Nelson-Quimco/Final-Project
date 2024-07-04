"use client";
import useUserdata from "@/hooks/useUserdata";
import React, { useEffect, useState } from "react";
import withAuth from "@/components/auth/withAuth";
import ResetPassword from "@/components/modals/ResetPassword";
import Button from "@/components/buttons/Button";
import useForumRequest from "@/hooks/requests/forum/useForumRequest";
import PostPreview from "@/components/cards/postPreview";
import { formatDateNormal } from "@/lib/functions/dateFormatter";

const Profile = () => {
  const [isModalOpen, setIsmodalOpen] = useState(false);

  const user = useUserdata();
  const { allPost, userPost, getPostbyUser } = useForumRequest();

  const userID = user?.userId;

  useEffect(() => {
    if (userID) {
      getPostbyUser(userID);
    }
  }, [allPost]);
  console.log(userPost);

  return (
    <div>
      <ResetPassword
        isOpen={isModalOpen}
        onClose={() => setIsmodalOpen(false)}
      ></ResetPassword>

      <div className="flex w-full border">
        <div className=" h-full w-[20%] flex flex-col items-center gap-3 p-2">
          <div className="border p-10 rounded-full"></div>
          <Button name="Edit Profile"></Button>
          <Button
            name="Reset Password"
            onClick={() => setIsmodalOpen(true)}
            className=""
          ></Button>
        </div>
        <div className="flex flex-col w-[80%] gap-10 p-10 text-[20px]">
          <div className="flex justify-between">
            <div className="flex flex-col justify-start gap-6 w-full font-bold">
              <p>
                Firstname:
                <span className=" font-normal text-[18px] ml-[10px]">
                  {user?.firstName}
                </span>
              </p>
              <p>
                Username:
                <span className=" font-normal text-[18px] ml-[10px]">
                  {user?.username}
                </span>
              </p>
            </div>
            <div className="flex flex-col justify-start gap-6 w-full font-bold">
              <p>
                Lastname:
                <span className=" font-normal text-[18px] ml-[10px]">
                  {user?.lastName}
                </span>
              </p>
              <p>
                Email:
                <span className=" font-normal text-[18px] ml-[10px]">
                  {user?.email}
                </span>
              </p>
            </div>
          </div>
          <div className="text-center">"I love Balls "</div>
        </div>
      </div>

      <div className="mt-5">
        <p className=" my-5">Posts({userPost?.length})</p>
        <div className="flex flex-col items-center gap-6">
          {userPost?.map((posts) => (
            <PostPreview
              title={posts.title}
              description={posts.content}
              date={new Date(posts.createdAt)}
              username="username"
              href={`/profile/${posts.postId}`}
              key={posts.postId}
              likes={posts.likes}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Profile);
