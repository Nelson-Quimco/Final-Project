import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
export interface Comment {
  id: number;
  postId: number;
  username: string;
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
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return comments.map((comment) => ({
        id: comment.commentId,
        username: comment.user.username,
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

  async toggleLike(
    commentId: number,
    userId: number,
  ): Promise<{ status: number; comment: any }> {
    try {
      // Check if the user has already liked the post
      const existingLike = await this.prismaService.commentLike.findUnique({
        where: {
          userId_commentId: {
            userId,
            commentId,
          },
        },
      });

      if (existingLike) {
        // If the like exists, remove it (unlike)
        await this.prismaService.commentLike.delete({
          where: {
            commentLikeId: existingLike.commentLikeId,
          },
        });

        // Decrement the likes count on the post
        const updatedPost = await this.prismaService.comment.update({
          where: { commentId },
          data: { likes: { decrement: 1 } },
        });

        return { status: 200, comment: updatedPost };
      } else {
        // If the like does not exist, create it
        await this.prismaService.commentLike.create({
          data: {
            userId,
            commentId,
          },
        });

        // Increment the likes count on the post
        const updatedPost = await this.prismaService.comment.update({
          where: { commentId },
          data: { likes: { increment: 1 } },
        });

        return { status: 200, comment: updatedPost };
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      throw new Error('Error toggling like');
    }
  }
}
