"use client";
import useUserdata from "@/hooks/useUserdata";
import React, { useEffect, useState } from "react";
import withAuth from "@/components/auth/withAuth";
import ResetPassword from "@/components/modals/ResetPassword";
import Button from "@/components/buttons/Button";
import useForumRequest from "@/hooks/requests/forum/useForumRequest";
import PostPreview from "@/components/cards/postPreview";
import ForumSkeleton from "@/components/skeleton/forumSkeleton";
import EditUserModal from "@/components/modals/EditUserModal";
import useUserProfile from "@/hooks/requests/user-profile/useUserProfile";
import ProfileHeaderCard from "@/components/cards/profileHeaderCard";
import ProfileCardSkeleton from "@/components/skeleton/profileCardSkeleton";

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
      <ResetPassword
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
