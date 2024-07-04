import { Post, User } from '@prisma/client';

export class Comment {
  commentId: number;
  postId: number;
  userId: number;
  likes: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  post: Post;
  user: User;
}
