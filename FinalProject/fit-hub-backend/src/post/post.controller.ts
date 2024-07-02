import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from '././entities/post.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post(':userId')
  async createPost(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    return await this.postService.createPost(userId, createPostDto);
  }

  @Get('get-posts')
  async findAll(): Promise<PostEntity[]> {
    return this.postService.findAllPosts();
  }

  @Delete(':id')
  async deletePost(@Param('id', ParseIntPipe) postId: number): Promise<void> {
    await this.postService.deletePost(postId);
  }

  @Patch(':postId')
  async updatePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postService.updatePost(postId, updatePostDto);
  }

}
