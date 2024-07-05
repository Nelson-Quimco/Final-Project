import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment(
    userId: number,
    createCommentDto: CreateCommentDto
  ): Promise<{ status: number; comment: CommentEntity | null }> {
    try {
      const { postId, content } = createCommentDto;
  
      const createdComment = await this.prismaService.comment.create({
        data: {
          userId,
          postId,
          content,
          likes: 0,
        },
        include: {
          user: true,
          post: true,
        },
      });
  
      const transformedComment = {
        commentId: createdComment.commentId,
        userId: createdComment.userId,
        postId: createdComment.postId,
        likes: createdComment.likes,
        content: createdComment.content,
        createdAt: createdComment.createdAt,
        updatedAt: createdComment.updatedAt,
        user: {
          userId: createdComment.user.userId,
          username: createdComment.user.username,
        },
        post: {
          postId: createdComment.post.postId,
          title: createdComment.post.title,
        },
      };
  
      return { status: 201, comment: transformedComment };
    } catch (error) {
      console.error('Error creating comment:', error);
      return { status: 500, comment: null };
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
