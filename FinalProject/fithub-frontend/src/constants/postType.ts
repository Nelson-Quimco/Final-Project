import User from "./userTypes";

type postType = {
  postId: number;
  userId: number;
  likes: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User; // Assuming User is another type defined similarly
  comments: Comment[]; // Assuming Comment is another type defined similarly
};

export type { postType };
