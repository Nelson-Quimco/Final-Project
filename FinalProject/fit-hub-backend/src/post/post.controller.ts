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
  HttpException,
  HttpStatus,
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
  ): Promise<{ status: number; post: PostEntity | null }> {
    try {
      const { status, post } = await this.postService.createPost(
        userId,
        createPostDto,
      );
      return { status, post };
    } catch (error) {
      console.error('Error creating post:', error);
      return { status: 500, post: null };
    }
  }

  @Get('get-post')
  async findAll(): Promise<{ status: number; posts: PostEntity[] }> {
    try {
      const { status, posts } = await this.postService.findAllPosts();
      return { status, posts };
    } catch (error) {
      console.error('Error fetching posts:', error);
      return { status: 500, posts: [] };
    }
  }

  @Delete(':id')
  async deletePost(
    @Param('id', ParseIntPipe) postId: number,
  ): Promise<{ status: number }> {
    try {
      const { status } = await this.postService.deletePost(postId);
      return { status };
    } catch (error) {
      console.error('Error deleting post:', error);
      return { status: 500 };
    }
  }

  @Get(':userId')
  async findAllPostsByUserId(@Param('userId') userId: string) {
    try {
      const filteredPosts = await this.postService.findAllPostsByUserId(
        Number(userId),
      );
      return { status: 200, data: filteredPosts.posts };
    } catch (error) {
      console.error('Error fetching posts:', error);
      return { status: 500, data: [] };
    }
  }

  @Patch(':postId')
  async updatePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<{ status: number; post: PostEntity | null }> {
    try {
      const { status, post } = await this.postService.updatePost(
        postId,
        updatePostDto,
      );
      return { status, post };
    } catch (error) {
      console.error('Error updating post:', error);
      return { status: 500, post: null };
    }
  }

  @Post(':postId/like')
  async likePost(@Param('postId') postId: string) {
    try {
      const likedPost = await this.postService.likePost(Number(postId));
      return { status: 200, data: likedPost };
    } catch (error) {
      console.error('Error liking post:', error);
      return { status: 500, data: null };
    }
  }

  @Get('get-post/:id')
  async getPostById(@Param('id', ParseIntPipe) postId: number) {
    try {
      const { status, post } = await this.postService.getPostById(postId);

      switch (status) {
        case 200:
          return { status, data: post };
        case 404:
          throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        default:
          throw new HttpException(
            'Internal server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
