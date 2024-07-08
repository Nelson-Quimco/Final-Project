"use client";
import withAuth from "@/components/auth/withAuth";
import React, { useState } from "react";
import PostPreview from "@/components/cards/postPreview";
import Button from "@/components/buttons/Button";
import useForumRequest from "@/hooks/requests/forum/useForumRequest";
import CreatePostModal from "@/components/modals/createPostModal";
import SearchBar from "@/components/search-bar/search-bar";
import ForumSkeleton from "@/components/skeleton/forumSkeleton";

const Forums = () => {
  const { allPost, loading, setLoading } = useForumRequest();
  const [isModalOpen, setIsmodalOpen] = useState(false);

  console.log(allPost);
  console.log(loading);

  return (
    <div className="h-full">
      <div className="flex justify-end">
        <SearchBar />
      </div>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsmodalOpen(false)}
      />
      <Button
        name="Create Post"
        className="mb-5 border-brightRed text-brightRed font-semibold border-2 p-1 w-[10rem] rounded-full"
        onClick={() => setIsmodalOpen(true)}
      />
      <div className="flex flex-col items-center gap-6 h-full">
        {loading ? (
          <div className="w-full flex flex-col gap-6">
            <ForumSkeleton />
            <ForumSkeleton />
            <ForumSkeleton />
            <ForumSkeleton />
            <ForumSkeleton />
          </div>
        ) : allPost ? (
          allPost?.map((posts, index) => (
            <PostPreview
              title={posts.title}
              description={posts.content}
              date={new Date(posts.createdAt)}
              username={posts.username}
              href={`/forum/${posts.postId}`}
              likes={posts.likes}
              key={index}
            />
          ))
        ) : (
          <div className="h-full">The Forum is Empty</div>
        )}
      </div>
    </div>
  );
};

export default withAuth(Forums);
