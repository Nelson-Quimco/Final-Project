"use client";
import PostCard from "@/components/cards/postCard";
import EditPostModal from "@/components/modals/EditPostModal";
import useForumRequest from "@/hooks/requests/forum/useForumRequest";
import React, { useEffect, useMemo, useState } from "react";
import { postType } from "@/constants/postType";
import DeletePostModal from "@/components/modals/deletePostModal";
import SinglePost from "@/components/skeleton/singlePost";
import Button from "@/components/buttons/Button";
import CreateCommentModal from "@/components/modals/createCommentModal";
import useComment from "@/hooks/requests/comment/useComment";
import CommentCard from "@/components/cards/commentCard";
import CommentSkeleton from "@/components/skeleton/CommentSkeleton";

const PostId = ({ params }: { params: { postId: number } }) => {
  const { post, getPostById, deletePost, loading } = useForumRequest();
  const { comments, getCommentByPost } = useComment();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<postType | null>(null);

  useEffect(() => {
    getPostById(params.postId);
  }, [params.postId]);

  useEffect(() => {
    getCommentByPost(params.postId);
  }, [params.postId, isCommentModalOpen]);

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

  // const handleDelete = async () => {
  //   if (currentPost) {
  //     console.log(currentPost.postId);
  //     await deletePost(currentPost.postId);
  //     await getPostById(params.postId); // Refresh the post data
  //     setIsDeleteModalOpen(false);
  //   }
  // };

  return (
    <div className="h-full">
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
        />
      )}

      <CreateCommentModal
        postId={params.postId}
        onClose={() => setIsCommentModalOpen(false)}
        isOpen={isCommentModalOpen}
      />

      <div>
        {loading ? (
          <SinglePost />
        ) : (
          post?.data.map((posts) => (
            <>
              <PostCard
                key={posts.postId}
                title={posts.title}
                content={posts.content}
                date={new Date(posts.createdAt)}
                username={posts.username}
                likes={posts.likes}
                postId={posts.postId}
                userId={posts.userId}
                onEdit={() => openEditModal(posts)}
                onDelete={() => openDeleteModal(posts)}
              />
            </>
          ))
        )}
      </div>
      <div className="mt-10">
        <div className="my-5">
          {loading ? (
            <div></div>
          ) : (
            <Button
              name="Create Comment"
              className="border-brightRed text-brightRed font-semibold rounded-full p-1 border-2"
              onClick={() => setIsCommentModalOpen(true)}
            />
          )}
        </div>
        <div className={`flex flex-col gap-3`}>
          {loading ? (
            <CommentSkeleton />
          ) : (
            comments?.map((x) => (
              <CommentCard
                key={x.id}
                postId={x.postId}
                commentId={x.id}
                userId={x.userId}
                username={x.username}
                content={x.content}
                likes={x.likes}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostId;
