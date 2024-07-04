"use client";
import PostCard from "@/components/cards/postCard";
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
          username="Username"
          likes={post.likes}
        />
      ))}
    </div>
  );
};

export default PostId;
