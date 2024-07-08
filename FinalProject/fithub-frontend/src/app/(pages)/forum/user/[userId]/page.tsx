"use client";
import PostPreview from "@/components/cards/postPreview";
import useForumRequest from "@/hooks/requests/forum/useForumRequest";
import useLoginRequest from "@/hooks/requests/user-authentication/useLoginRequest";
import React, { useEffect } from "react";
import { DiVim } from "react-icons/di";

const userId = ({ params }: { params: { userId: number } }) => {
  const { user, getUserById } = useLoginRequest();
  const { userPost, getPostbyUser } = useForumRequest();
  useEffect(() => {
    getUserById(params.userId);
    getPostbyUser(params.userId);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full border border-none rounded-md shadow-md h-fullflex items-center bg-white p-3">
        <div className="flex gap-6 p-3 items-center">
          <div className="border p-10 rounded-full bg-offWhite"></div>
          <p className="text-[25px] font-bold">{user?.user.username}</p>
        </div>
      </div>
      <div className="w-full h-full">
        <div className="my-5">{user?.user.username}'s Post/s</div>
        <div className="flex flex-col gap-6">
          {userPost?.map((posts) => (
            <PostPreview
              title={posts.title}
              description={posts.content}
              date={new Date(posts.createdAt)}
              username={posts.username}
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

export default userId;
