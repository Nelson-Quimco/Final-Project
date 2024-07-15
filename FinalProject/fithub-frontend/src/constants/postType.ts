import { User } from "./userTypes";
import commentType from "./commentType";

type postType = {
  postId: number;
  userId: number;
  likes: number;
  title: string;
  content: string;
  createdAt: string | Date;
  updatedAt: string;
  username: string; // Assuming User is another type defined similarly
  comments: commentType[]; // Assuming Comment is another type defined similarly
};

interface postResponse {
  data: postType[];
}

export type { postType, postResponse };
