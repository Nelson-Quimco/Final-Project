"use client";
import withAuth from "@/components/auth/withAuth";
import React, { useState } from "react";
import PostPreview from "@/components/cards/postPreview";
import Button from "@/components/buttons/Button";
import useForumRequest from "@/hooks/requests/forum/useForumRequest";
import CreatePostModal from "@/components/modals/createPostModal";

const Forums = () => {
  const { allPost } = useForumRequest();
  const [isModalOpen, setIsmodalOpen] = useState(false);

  console.log(allPost);

  return (
    <div className="h-full">
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsmodalOpen(false)}
      />
      <Button
        name="Create Post"
        className="mb-5 border-brightRed text-brightRed font-semibold border-2 p-1 w-[10rem] rounded-full"
        onClick={() => setIsmodalOpen(true)}
      />
      <div className="flex flex-col items-center gap-6">
        {allPost ? (
          allPost?.map((posts, index) => (
            <PostPreview
              title={posts.title}
              description={posts.content}
              date={new Date(posts.createdAt)}
              username="username"
              href={`/forum/${posts.postId}`}
              likes={posts.likes}
              key={index}
            />
          ))
        ) : (
          <div className="h-full">NO Data</div>
        )}
      </div>
    </div>
  );
};

export default withAuth(Forums);
