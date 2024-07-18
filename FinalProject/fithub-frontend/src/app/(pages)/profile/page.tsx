"use client";

import withAuth from "@/components/auth/withAuth";
import React, { useEffect, useState } from "react";
import useUserdata from "@/hooks/useUserdata";
import useUserProfile from "@/hooks/requests/user-profile/useUserProfile";
import useForumRequest from "@/hooks/requests/forum/useForumRequest";
import {
  ResetPasswordModal,
  PostPreview,
  ForumSkeleton,
  EditUserModal,
  ProfileHeaderCard,
  ProfileCardSkeleton,
} from "@/components";

const Profile = () => {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const user = useUserdata();
  const { userPost, getPostbyUser, loading } = useForumRequest();
  const {
    userData,
    getUserInformation,
    loading: profileLoading,
  } = useUserProfile();

  const userID = user?.userId;

  useEffect(() => {
    if (userID) {
      getPostbyUser(userID);
      getUserInformation(userID);
    }
  }, []);

  return (
    <div className="h-full">
      <ResetPasswordModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      {profileLoading ? (
        <ProfileCardSkeleton />
      ) : (
        <ProfileHeaderCard
          firstname={userData?.user.firstName}
          lastname={userData?.user.lastName}
          username={userData?.user.username}
          email={userData?.user.email}
          openEditModal={() => setIsEditModalOpen(true)}
          openResetModal={() => setIsResetModalOpen(true)}
        />
      )}

      <div className="mt-5">
        <p className=" my-5">Posts({userPost?.length ?? 0})</p>
        <div className="flex flex-col items-center gap-6">
          {loading ? (
            <div className="flex flex-col w-full gap-6">
              <ForumSkeleton />
              <ForumSkeleton />
              <ForumSkeleton />
              <ForumSkeleton />
              <ForumSkeleton />
            </div>
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

export default withAuth(Profile);
