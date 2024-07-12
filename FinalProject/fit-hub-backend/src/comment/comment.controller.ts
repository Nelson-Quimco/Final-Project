import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  ExecutionContext,
  createParamDecorator,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';

export interface Comment {
  id: number;
  postId: number;
  userId: number;
  content: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create-comment/:postId')
  async createComment(
    @Param('postId') postId: number,
    @Body('userId') userId: number,
    @Body('content') content: string,
  ) {
    try {
      const comment = await this.commentService.createComment(
        postId,
        userId,
        content,
      );
      return comment;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  }

  @Get(':postId')
  async getCommentsByPost(@Param('postId') postId: number): Promise<Comment[]> {
    try {
      const comments = await this.commentService.getCommentsByPostId(postId);
      return comments;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }

  @Patch('update-comment/:id')
  async updateComment(
    @Param('id', ParseIntPipe) commentId: number,
    @Body('content') updatedContent: string,
  ) {
    try {
      const updatedComment = await this.commentService.updateComment(
        commentId,
        updatedContent,
      );
      return updatedComment;
    } catch (error) {
      throw new HttpException(
        `Error updating comment: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
