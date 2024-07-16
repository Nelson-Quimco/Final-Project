import { postResponse, postType } from "@/constants/postType";
import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const axiosReq = axios.create({ baseURL: process.env.NEXT_PUBLIC_URL });
const useForumRequest = () => {
  const [allPost, setAllPost] = useState<postType[] | null>([]);
  const [userPost, setUserPost] = useState<postType[] | null>(null);
  const [post, setPost] = useState<postResponse | null>(null);
  const [yourPostId, setYourPostId] = useState<postResponse | null>(null);
  const [postLikes, setPostLikes] = useState(0);
  const [loading, setLoading] = useState<boolean>();

  const getAllPost = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosReq.get("post/get-post");
      setAllPost(res.data.posts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const createPost = async (
    userId: number | undefined,
    title: string,
    content: string
  ) => {
    setLoading(true);
    try {
      const body = {
        title: title,
        content: content,
      };

      const res = await axiosReq.post(`post/${userId}`, body);
      setYourPostId(res.data.post.postId);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getPostbyUser = useCallback(async (id: number) => {
    try {
      const res = await axiosReq.get(`/post/${id}`);
      setUserPost(res.data.data);
      // console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const likePost = async (postId: number, userId: number) => {
    try {
      const res = await axiosReq.post(`/post/${postId}/like`, {
        userId: userId,
      });
      setPostLikes(res.data.post.likes);
    } catch (error) {
      console.log(error);
    }
  };

  const getPostById = async (postId: number) => {
    setLoading(true);
    try {
      const res = await axiosReq.get(`/post/get-post/${postId}`);
      setLoading(false);
      console.log(res.data.data);
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (postId: number) => {
    try {
      await axiosReq.delete(`post/${postId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const editPost = async (postId: number, title: string, content: string) => {
    try {
      const body = {
        title: title,
        content: content,
      };
      const res = await axiosReq.patch(`/post/${postId}`, body);
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const memoizedValues = useMemo(() => {
    return {
      allPost,
      userPost,
    };
  }, [allPost, userPost]);

  useEffect(() => {
    getAllPost();
  }, [getAllPost]);

  return {
    ...memoizedValues,
    post,
    allPost,
    userPost,
    postLikes,
    setPostLikes,
    createPost,
    getPostbyUser,
    getPostById,
    editPost,
    deletePost,
    likePost,
    yourPostId,
    loading,
    setLoading,
  };
};

export default useForumRequest;
