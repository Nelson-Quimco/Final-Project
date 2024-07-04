import { postResponse, postType } from "@/constants/postType";
import axios from "axios";
import React, { useEffect, useState } from "react";

const axiosReq = axios.create({ baseURL: process.env.NEXT_PUBLIC_URL });
const useForumRequest = () => {
  const [allPost, setAllPost] = useState<postType[] | null>(null);
  const [userPost, setUserPost] = useState<postType[] | null>(null);
  const [post, setPost] = useState<postResponse | null>(null);

  const getAllPost = async () => {
    try {
      const res = await axiosReq.get("post/get-post");
      setAllPost(res.data.posts);
      console.log(res.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async (
    userId: number | undefined,
    title: string,
    content: string
  ) => {
    try {
      const body = {
        title: title,
        content: content,
      };

      const res = await axiosReq.post(`post/${userId}`, body);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const getPostbyUser = async (id: number) => {
    try {
      const res = await axiosReq.get(`/post/${id}`);
      setUserPost(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = async (postId: number) => {
    try {
      const res = await axiosReq.post(`/post/${postId}/like`);
    } catch (error) {
      console.log(error);
    }
  };

  const getPostById = async (postId: number) => {
    try {
      const res = await axiosReq.get(`/post/get-post/${postId}`);
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { post, allPost, userPost, createPost, getPostbyUser, getPostById };
};

export default useForumRequest;
