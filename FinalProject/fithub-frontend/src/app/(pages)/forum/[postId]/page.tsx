"use client";
import PostCard from "@/components/cards/postCard";
import EditPostModal from "@/components/modals/EditPostModal";
import useForumRequest from "@/hooks/requests/forum/useForumRequest";
import React, { useEffect, useState } from "react";
import { postType } from "@/constants/postType";
import DeletePostModal from "@/components/modals/deletePostModal";
import SinglePost from "@/components/skeleton/singlePost";

const PostId = ({ params }: { params: { postId: number } }) => {
  const { post, getPostById, deletePost, loading, setLoading } =
    useForumRequest();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<postType | null>(null);

  useEffect(() => {
    getPostById(params.postId);
  }, [params.postId]);

  const openEditModal = (post: postType) => {
    setCurrentPost(post);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (post: postType) => {
    setCurrentPost(post);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = async () => {
    await getPostById(params.postId); // Refresh the post data
    setIsEditModalOpen(false);
  };

  const handleDelete = async () => {
    if (currentPost) {
      await deletePost(currentPost.postId);
      await getPostById(params.postId); // Refresh the post data
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="h-full">
      {loading ? (
        <SinglePost />
      ) : (
        post?.data.map((post) => (
          <PostCard
            title={post.title}
            content={post.content}
            date={new Date(post.createdAt)}
            username={post.username}
            likes={post.likes}
            postId={post.postId}
            userId={post.userId}
            key={post.postId}
            onEdit={() => openEditModal(post)}
            onDelete={() => openDeleteModal(post)} // Pass openDeleteModal to PostCard
          />
        ))
      )}
      {currentPost && (
        <EditPostModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          postId={currentPost.postId}
          title={currentPost.title}
          content={currentPost.content}
          onEdit={handleEdit}
        />
      )}
      {currentPost && (
        <DeletePostModal
          postId={currentPost.postId}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default PostId;
