import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
export interface Comment {
  id: number;
  postId: number;
  userId: number;
  content: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment(postId: number, userId: number, content: string) {
    try {
      const comment = await this.prismaService.comment.create({
        data: {
          postId: Number(postId),
          userId: Number(userId),
          content: content,
          likes: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return {
        ...comment,
        isLiked: false,
      };
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  }

  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    try {
      const comments = await this.prismaService.comment.findMany({
        where: {
          postId: Number(postId),
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return comments.map((comment) => ({
        id: comment.commentId,
        postId: comment.postId,
        userId: comment.userId,
        content: comment.content,
        likes: comment.likes,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      }));
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }

  async updateComment(commentId: number, updatedContent: string) {
    try {
      const updatedComment = await this.prismaService.comment.update({
        where: {
          commentId: commentId,
        },
        data: {
          content: updatedContent,
          updatedAt: new Date(),
        },
      });
      return updatedComment;
    } catch (error) {
      throw new Error(`Error updating comment: ${error.message}`);
    }
  }
}
