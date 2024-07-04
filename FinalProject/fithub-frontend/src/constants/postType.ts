import User from "./userTypes";

type postType = {
  postId: number;
  userId: number;
  likes: number;
  title: string;
  content: string;
  createdAt: string | Date;
  updatedAt: string;
  user: User; // Assuming User is another type defined similarly
  comments: Comment[]; // Assuming Comment is another type defined similarly
};

interface postResponse {
  data: postType[];
}

export type { postType, postResponse };
