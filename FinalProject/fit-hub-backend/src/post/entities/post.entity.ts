import { Post as PrismaPostType, Prisma } from '@prisma/client';

export class Post implements PrismaPostType {
  postId: number;
  userId: number;
  isDeleted: boolean;
  likes: number;
  dislikes: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
