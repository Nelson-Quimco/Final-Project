import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment(
    userId: number,
    postId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<{ status: number; comment: Comment | null }> {
    try {
      const { content } = createCommentDto;

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

      const comment: Comment = {
        commentId: 1,
        postId: postId,
        userId: userId,
        likes: 0,
        content: createCommentDto.content,
        createdAt: new Date(),
        updatedAt: new Date(),
        post: null,
        user: null,
      };

      return { status: 200, comment: comment };
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
