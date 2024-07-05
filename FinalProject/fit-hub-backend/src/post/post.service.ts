import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post as PostEntity } from '././entities/post.entity';

@Injectable()
export class PostService {
  post: any;
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(
    userId: number,
    createPostDto: CreatePostDto,
  ): Promise<{ status: number; post: PostEntity | null }> {
    try {
      const { title, content } = createPostDto;

      const createdPost = await this.prismaService.post.create({
        data: {
          userId,
          title,
          content,
          likes: 0,
        },
        include: {
          user: true,
        },
      });

      const transformedPost = {
        postId: createdPost.postId,
        userId: createdPost.userId,
        likes: createdPost.likes,
        title: createdPost.title,
        content: createdPost.content,
        createdAt: createdPost.createdAt,
        updatedAt: createdPost.updatedAt,
      };

      return { status: 201, post: transformedPost };
    } catch (error) {
      console.error('Error creating post:', error);
      return { status: 500, post: null };
    }
  }

  async likePost(
    postId: number,
  ): Promise<{ status: number; post: PostEntity | null }> {
    try {
      const post = await this.prismaService.post.update({
        where: {
          postId,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
        include: {
          user: true,
        },
      });

      if (!post) {
        throw new Error('Post not found');
      }

      const transformedPost = {
        postId: post.postId,
        userId: post.userId,
        likes: post.likes,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };

      return { status: 200, post: transformedPost };
    } catch (error) {
      console.error('Error liking post:', error);
      return { status: 500, post: null };
    }
  }

  async updatePost(
    postId: number,
    updatePostDto: UpdatePostDto,
  ): Promise<{ status: number; post: PostEntity | null }> {
    try {
      const { title, content } = updatePostDto;

      const updatedPost = await this.prismaService.post.update({
        where: {
          postId: postId,
        },
        data: {
          title,
          content,
          updatedAt: new Date(),
        },
        include: {
          user: true,
        },
      });

      const transformedPost = {
        postId: updatedPost.postId,
        userId: updatedPost.userId,
        likes: updatedPost.likes,
        title: updatedPost.title,
        content: updatedPost.content,
        createdAt: updatedPost.createdAt,
        updatedAt: updatedPost.updatedAt,
      };

      return { status: 200, post: transformedPost };
    } catch (error) {
      console.error('Error updating post:', error);
      if (error.code === 'P2025') {
        return { status: 404, post: null };
      }

      return { status: 500, post: null };
    }
  }

  async deletePost(postId: number): Promise<{ status: number }> {
    try {
      await this.prismaService.post.delete({
        where: {
          postId: postId,
        },
      });
      return { status: 204 };
    } catch (error) {
      console.error('Error deleting post:', error);
      return { status: 500 };
    }
  }

  async findAllPosts(): Promise<{ status: number; posts: PostEntity[] }> {
    try {
      const posts = await this.prismaService.post.findMany({
        include: {
          user: true,
        },
      });

      const transformedPosts = posts.map((post) => ({
        postId: post.postId,
        userId: post.userId,
        likes: post.likes,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      }));

      return { status: 200, posts: transformedPosts };
    } catch (error) {
      console.error('Error fetching posts:', error);
      return { status: 500, posts: [] };
    }
  }

  async findAllPostsByUserId(
    userId: number,
  ): Promise<{ status: number; posts: PostEntity[] }> {
    try {
      const posts = await this.prismaService.post.findMany({
        where: {
          userId: userId,
        },
        include: {
          user: true,
        },
      });

      const transformedPosts = posts.map((post) => ({
        postId: post.postId,
        userId: post.userId,
        likes: post.likes,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      }));

      return { status: 200, posts: transformedPosts };
    } catch (error) {
      console.error('Error fetching posts:', error);
      return { status: 500, posts: [] };
    }
  }

  async getPostById(
    postId: number,
  ): Promise<{ status: number; post: PostEntity | null }> {
    try {
      const post = await this.prismaService.post.findUnique({
        where: {
          postId: postId,
        },
        include: {
          user: true,
        },
      });

      if (!post) {
        return { status: 404, post: null };
      }

      const transformedPost = {
        postId: post.postId,
        userId: post.userId,
        likes: post.likes,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };

      return { status: 200, post: transformedPost };
    } catch (error) {
      console.error('Error getting post:', error);
      return { status: 500, post: null };
    }
  }
}
