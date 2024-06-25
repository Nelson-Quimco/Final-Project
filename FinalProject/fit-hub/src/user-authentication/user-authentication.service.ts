import { Injectable } from '@nestjs/common';
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
  ): Promise<{ message: string; user?: User }> {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return {
        message:
          'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      };
    }

    try {
      const user = await this.prismaService.user.create({
        data: {
          firstName,
          lastName,
          username,
          password,
          email,
        },
      });
      return { message: 'User created successfully', user };
    } catch (error) {
      return { message: 'Failed to create user: ' + error.message };
    }
  }

  async loginUser(
    username: string,
    password: string,
  ): Promise<{ message: string; user?: User }> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          username,
          password,
        },
      });

      if (!user) {
        return { message: 'Invalid username or password' };
      }

      return { message: 'Login successfully', user };
    } catch (error) {
      return { message: 'Failed to login: ' + error.message };
    }
  }

  async logoutUser(userId: string): Promise<{ message: string }> {
    try {
      await this.prismaService.user.update({
        where: {
          userId: parseInt(userId, 10),
        },
        data: {
          sessionToken: null,
        } as Prisma.UserUpdateInput,
      });

      return { message: 'Logout successful' };
    } catch (error) {
      return { message: 'Failed to logout: ' + error.message };
    }
  }

  async findAll(): Promise<{ message: string; users?: User[] }> {
    try {
      const users = await this.prismaService.user.findMany();
      return { message: 'Users retrieved successfully', users };
    } catch (error) {
      return { message: 'Failed to retrieve users: ' + error.message };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} userAuthentication`;
  }

  async updateUser(
    userId: number,
    newPassword: string,
  ): Promise<{ message: string; user?: User }> {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      return {
        message:
          'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
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
        user: updatedUser,
      };
    } catch (error) {
      return { message: 'Failed to update users password: ' + error.message };
    }
  }

  async remove(userId: number): Promise<{ message: string; user?: User }> {
    try {
      const user = await this.prismaService.user.delete({
        where: {
          userId,
        },
      });

      return { message: 'User deleted successfully', user };
    } catch (error) {
      return { message: 'Failed to delete user: ' + error.message };
    }
  }
}
