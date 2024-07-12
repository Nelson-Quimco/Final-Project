import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { UpdateCommentDto } from './dto/update-comment.dto';

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

  @Post(':postId')
  async createComment(
    @Param('postId') postId: number,
    @Body('userId') userId: number,
    @Body('content') content: string
  ) {
    try {
      const comment = await this.commentService.createComment(postId, userId, content);
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


  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }
  3;

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
