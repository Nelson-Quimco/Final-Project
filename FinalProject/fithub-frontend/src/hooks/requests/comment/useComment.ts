import commentType from "@/constants/commentType";
import axios from "axios";
import React, { useState } from "react";

const axiosReq = axios.create({ baseURL: process.env.NEXT_PUBLIC_URL });
const useComment = () => {
  const [comments, setComments] = useState<commentType[] | null>(null);

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
      await axiosReq.post(`comments/create-comment/${postId} `, body);
    } catch (error) {
      console.log(error);
    }
  };

  const getCommentByPost = async (postId: number) => {
    try {
      const res = await axiosReq.get(`comments/${postId}`);
      setComments(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { comments, createComment, getCommentByPost };
};

export default useComment;
