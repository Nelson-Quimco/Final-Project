import { ForbiddenException, Injectable } from '@nestjs/common';
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
  ): Promise<PostEntity> {
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

    return {
      postId: createdPost.postId,
      userId: createdPost.userId,
      likes: createdPost.likes,
      title: createdPost.title,
      content: createdPost.content,
      createdAt: createdPost.createdAt,
      updatedAt: createdPost.updatedAt,
    };
  }

  async updatePost(
    postId: number,
    updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
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

    return {
      postId: updatedPost.postId,
      userId: updatedPost.userId,
      likes: updatedPost.likes,
      title: updatedPost.title,
      content: updatedPost.content,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
    };
  }

  async deletePost(postId: number): Promise<void> {
    await this.prismaService.post.delete({
      where: {
        postId: postId,
      },
    });
  }

  async findAllPosts(): Promise<PostEntity[]> {
    const posts = await this.prismaService.post.findMany({
      include: {
        user: true,
      },
    });

    return posts.map((post) => ({
      postId: post.postId,
      userId: post.userId,
      likes: post.likes,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));
  }
}
