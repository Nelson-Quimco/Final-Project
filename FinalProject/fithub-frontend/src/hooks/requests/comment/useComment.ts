import commentType from "@/constants/commentType";
import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";

const axiosReq = axios.create({ baseURL: process.env.NEXT_PUBLIC_URL });
const useComment = () => {
  const [comments, setComments] = useState<commentType[] | null>(null);
  const [commentLikes, setCommentLikes] = useState<number>(0);

  const createComment = async (
    postId: number,
    userId: number,
    content: string
  ) => {
    const body = {
      userId: userId,
      content: content,
    };

    try {
      const res = await axiosReq.post(
        `comments/create-comment/${postId} `,
        body
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getCommentByPost = useCallback(async (postId: number) => {
    try {
      const res = await axiosReq.get(`comments/${postId}`);
      setComments(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const editComment = async (id: number, body: string) => {
    try {
      await axiosReq.patch(`comments/update-comment/${id}`, { content: body });
    } catch (error) {
      console.log(error);
    }
  };

  const likeComment = async (commentId: number, userId: number) => {
    try {
      const res = await axiosReq.post(`comments/${commentId}/like`, {
        userId: userId,
      });

      setCommentLikes(res.data.comment.likes);
    } catch (error) {
      console.log(error);
    }
  };

  const value = useMemo(() => {
    return { comments };
  }, [comments]);

  return {
    ...value,
    commentLikes,
    setCommentLikes,
    createComment,
    getCommentByPost,
    editComment,
    likeComment,
  };
};

export default useComment;
