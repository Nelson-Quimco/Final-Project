import { Injectable } from '@nestjs/common';
import { UpdateCommentDto } from './dto/update-comment.dto';
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
      return comment;
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

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
