"use client";
import { PostPreview } from "@/components";
import useForumRequest from "@/hooks/requests/forum/useForumRequest";
import useLoginRequest from "@/hooks/requests/user-authentication/useLoginRequest";
import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const userId = ({ params }: { params: { userId: number } }) => {
  const { user, getUserById, loading } = useLoginRequest();
  const { userPost, getPostbyUser } = useForumRequest();
  useEffect(() => {
    getPostbyUser(params.userId);
    getUserById(params.userId);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full border border-none rounded-md shadow-md h-fullflex items-center bg-white p-3">
        <div className="flex gap-6 p-3 items-center">
          <FaUserCircle size={80} className="text-blue" />
          {loading ? (
            <Skeleton width={200} height={50} />
          ) : (
            <p className="text-[25px] font-bold">{user?.user.username}</p>
          )}
        </div>
      </div>
      <div className="w-full h-full">
        <div className="my-5">
          {loading ? (
            <div>
              <Skeleton height={30} width={100} />
            </div>
          ) : (
            <p>{user?.user.username}'s Post/s</p>
          )}
        </div>
        <div className="flex flex-col gap-6">
          {loading ? (
            <>
              <Skeleton height={150} />
              <Skeleton height={150} />
              <Skeleton height={150} />
              <Skeleton height={150} />
            </>
          ) : (
            userPost?.map((posts) => (
              <PostPreview
                title={posts.title}
                description={posts.content}
                date={new Date(posts.createdAt)}
                username={posts.username}
                href={`/profile/${posts.postId}`}
                key={posts.postId}
                likes={posts.likes}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default userId;
