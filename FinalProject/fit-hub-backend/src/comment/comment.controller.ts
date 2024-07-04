import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from '@prisma/client';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // @Post(':postId/create')
  // async createComment(
  //   @Param('postId') postId: number,
  //   @Body() createCommentDto: CreateCommentDto,
  //   @GetUser() user: User,
  // ): Promise<{ status: number; comment: Comment }> {
  //   const userId = user.id;
  //   const { status, comment } = await this.commentService.createComment(userId, postId, createCommentDto);
  //   return { status, comment };
  // }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }3

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
