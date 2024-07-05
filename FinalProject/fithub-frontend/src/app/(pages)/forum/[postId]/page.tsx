"use client";
import PostCard from "@/components/cards/postCard";
import EditPostModal from "@/components/modals/EditPostModal";
import useForumRequest from "@/hooks/requests/forum/useForumRequest";
import React, { useEffect } from "react";

const PostId = ({ params }: { params: { postId: number } }) => {
  const { post, getPostById } = useForumRequest();

  useEffect(() => {
    getPostById(params.postId);
  }, []);

  console.log(post);

  return (
    <div>
      {post?.data.map((post) => (
        <PostCard
          title={post.title}
          content={post.content}
          date={new Date(post.createdAt)}
          username={post.username}
          likes={post.likes}
          postId={post.postId}
          userId={post.userId}
          key={post.postId}
        />
      ))}
    </div>
  );
};

export default PostId;
