export interface Comment {
  id: number;
  postId: number;
  userId: number;
  content: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}
