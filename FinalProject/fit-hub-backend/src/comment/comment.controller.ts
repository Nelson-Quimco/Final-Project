import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpException,
  HttpStatus,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, User } from '@prisma/client';
import { CreateCommentDto } from './dto/create-comment.dto';
import { RequestWithUser } from './request.interface';
import { CommentEntity } from './entities/comment.entity';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('comment-post')
  async createComment(
    @Req() request: RequestWithUser,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<{ status: number; comment: CommentEntity | null }> {
    console.log('request.user:', request.user);
    if (!request.user || !request.user.userId) {
      throw new BadRequestException('Invalid user information');
    }
    const userId = request.user.userId;
    return this.commentService.createComment(userId, createCommentDto);
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
