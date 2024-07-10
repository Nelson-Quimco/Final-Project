export class CommentEntity {
  commentId: number;
  postId: number;
  userId: number;
  likes: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    userId: number;
    username: string;
  };
  post: {
    postId: number;
    title: string;
  };
}
