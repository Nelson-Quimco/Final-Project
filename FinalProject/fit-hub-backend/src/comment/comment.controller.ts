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
  InternalServerErrorException,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, User } from '@prisma/client';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';

interface RequestWithUser extends Request {
  user: {
    userId: number;
  };
}

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // @Post('comment-post')
  // async createComment(
  //   @Req() req: RequestWithUser,
  //   @Body() createCommentDto: CreateCommentDto,
  // ): Promise<CommentEntity> {
  //   if (!req.user || typeof req.user.userId !== 'number') {
  //     throw new BadRequestException('User information is not available');
  //   }

  //   try {
  //     return await this.commentService.createComment(
  //       req.user.userId,
  //       createCommentDto,
  //     );
  //   } catch (error) {
  //     console.error('Error creating comment:', error);
  //     throw new InternalServerErrorException('Failed to create comment');
  //   }
  // }
  
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
