import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  // async createComment(
  //   userId: number,
  //   createCommentDto: CreateCommentDto,
  // ): Promise<CommentEntity> {
  //   try {
  //     // Check if the user is authenticated
  //     const user = await this.getUserDetails(userId);
  //     if (!user || !user.userId) {
  //       throw new UnauthorizedException('User is not authenticated. Please login and try again.');
  //     }
  
  //     const { postId, content } = createCommentDto;
  
  //     const createdComment = await this.prismaService.comment.create({
  //       data: {
  //         userId,
  //         postId,
  //         content,
  //         likes: 0,
  //       },
  //       include: {
  //         user: true,
  //         post: true,
  //       },
  //     });
  
  //     return this.transformCommentEntity(createdComment);
  //   } catch (error) {
  //     if (error instanceof UnauthorizedException) {
  //       throw error;
  //     }
  
  //     console.error('Error creating comment:', error);
  //     throw new InternalServerErrorException('Failed to create comment');
  //   }
  // }
  
  // async getUserDetails(userId: number) {
  //   try {
  //     // Fetch the user details from the database
  //     const user = await this.prismaService.user.findUnique({
  //       where: {
  //         userId,
  //       },
  //     });
  
  //     return user;
  //   } catch (error) {
  //     console.error('Error getting user details:', error);
  //     return null;
  //   }
  // }
  
  // transformCommentEntity(
  //   comment: Prisma.CommentGetPayload<{
  //     include: {
  //       user: true;
  //       post: true;
  //     };
  //   }>,
  // ): CommentEntity {
  //   return {
  //     commentId: comment.commentId,
  //     userId: comment.userId,
  //     postId: comment.postId,
  //     likes: comment.likes,
  //     content: comment.content,
  //     createdAt: comment.createdAt,
  //     updatedAt: comment.updatedAt,
  //     user: {
  //       userId: comment.user.userId,
  //       username: comment.user.username,
  //     },
  //     post: {
  //       postId: comment.post.postId,
  //       title: comment.post.title,
  //     },
  //   };
  // }
  
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
