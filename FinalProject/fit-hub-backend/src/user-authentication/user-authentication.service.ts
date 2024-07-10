import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateUserAuthenticationDto } from './dto/update-user-authentication.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '.prisma/client';

@Injectable()
export class UserAuthenticationService {
  prisma: any;
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    email: string,
  ): Promise<{
    statusCode: number;
    message: string;
    data?: { message?: string; status?: number; user?: User };
  }> {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return {
        statusCode: 500,
        message: 'Failed to create user: Error message',
        data: {
          message:
            'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
          status: 500,
        },
      };
    }

    try {
      // Check if the user already exists based on the username
      const existingUser = await this.prismaService.user.findFirst({
        where: {
          username,
        },
      });

      if (existingUser) {
        return {
          statusCode: 409,
          message: 'Error: The user already exists',
          data: {
            message: 'A user with the same username already exists',
            status: 409,
          },
        };
      }

      const user = await this.prismaService.user.create({
        data: {
          firstName,
          lastName,
          username,
          password,
          email,
        },
      });
      return {
        statusCode: 201,
        message: 'User created successfully',
        data: {
          user,
        },
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Failed to create user: ' + error.message,
        data: {
          message:
            'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
          status: 500,
        },
      };
    }
  }

  async loginUser(
    username: string,
    password: string,
  ): Promise<{ message: string; status?: number; user?: User }> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          username,
          password,
        },
      });

      if (!user) {
        return {
          message: 'Invalid username or password',
          status: 401, // Unauthorized
        };
      }

      return {
        message: 'Login successful',
        status: 200, // OK
        user,
      };
    } catch (error) {
      return {
        message: 'Failed to login: ' + error.message,
        status: 500, // Internal Server Error
      };
    }
  }

  async logoutUser(
    userId: string,
  ): Promise<{ message: string; status?: number }> {
    try {
      await this.prismaService.user.update({
        where: {
          userId: parseInt(userId, 10),
        },
        data: {
          sessionToken: null,
        } as Prisma.UserUpdateInput,
      });

      return {
        message: 'Logout successful',
        status: 200,
      };
    } catch (error) {
      return {
        message: 'Failed to logout: ' + error.message,
        status: 500,
      };
    }
  }

  async findAll(): Promise<{
    message: string;
    status?: number;
    users?: User[];
  }> {
    try {
      const users = await this.prismaService.user.findMany();
      return {
        message: 'Users retrieved successfully',
        status: 200,
        users,
      };
    } catch (error) {
      return {
        message: 'Failed to retrieve users: ' + error.message,
        status: 500,
      };
    }
  }

  async updateUser(
    userId: number,
    newPassword: string,
  ): Promise<{ message: string; status?: number; user?: User }> {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      return {
        message:
          'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        status: 400,
      };
    }

    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          userId,
        },
      });

      if (user.password === newPassword) {
        return {
          message: 'New password cannot be the same as the old password',
          status: 400,
        };
      }

      const updatedUser = await this.prismaService.user.update({
        where: {
          userId,
        },
        data: {
          password: newPassword,
        },
      });

      return {
        message: 'Users password updated successfully',
        status: 200,
        user: updatedUser,
      };
    } catch (error) {
      return {
        message: 'Failed to update users password: ' + error.message,
        status: 500,
      };
    }
  }

  async remove(
    userId: number,
  ): Promise<{ message: string; status?: number; user?: User }> {
    try {
      const user = await this.prismaService.user.delete({
        where: {
          userId,
        },
      });

      return {
        message: 'User deleted successfully',
        status: 200,
        user,
      };
    } catch (error) {
      return {
        message: 'Failed to delete user: ' + error.message,
        status: 400,
      };
    }
  }

  async getUserById(userId: number): Promise<{ user?: User }> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          userId: userId,
        },
        include: {
          profile: true,
          passwordResets: true,
          fitnessExercises: true,
          posts: true,
          comments: true,
          progresses: true,
        },
      });
  
      return { user };
    } catch (error) {
      throw new InternalServerErrorException(`Failed to get user: ${error.message}`);
    }
  }

  async editProfile(
    userId: number,
    firstName?: string,
    lastName?: string,
    username?: string,
    email?: string
  ): Promise<{
    statusCode: number;
    message: string;
    data?: { message?: string; status?: number; user?: User };
  }> {
    try {
      const existingUser = await this.prismaService.user.findUnique({
        where: {
          userId: userId,
        },
      });
  
      if (!existingUser) {
        return {
          statusCode: 404,
          message: 'Error: User not found',
          data: {
            message: 'The specified user does not exist',
            status: 404,
          },
        };
      }
      const updatedUser = await this.prismaService.user.update({
        where: {
          userId,
        },
        data: {
          firstName: firstName || existingUser.firstName,
          lastName: lastName || existingUser.lastName,
          username: username || existingUser.username,
          email: email || existingUser.email,
        },
      });
  
      return {
        statusCode: 200,
        message: 'User updated successfully',
        data: {
          user: updatedUser,
        },
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Failed to update user: ' + error.message,
        data: {
          message: 'An error occurred while updating the user',
          status: 500,
        },
      };
    }
  }
}
