import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserAuthenticationService } from './user-authentication.service';
import { CreateUserAuthenticationDto } from './dto/create-user-authentication.dto';
import { UpdateUserAuthenticationDto } from './dto/update-user-authentication.dto';
import { User } from '@prisma/client';
import { HttpStatus, HttpException } from '@nestjs/common';

@Controller('user-authentication')
export class UserAuthenticationController {
  constructor(
    private readonly userAuthenticationService: UserAuthenticationService,
  ) {}

  @Post('signUp')
  async create(
    @Body() createUserAuthenticationDto: CreateUserAuthenticationDto,
  ): Promise<{ message: string; data?: any }> {
    const { firstName, lastName, username, password, email } =
      createUserAuthenticationDto;

    try {
      const response = await this.userAuthenticationService.create(
        firstName,
        lastName,
        username,
        password,
        email,
      );
      return {
        message: response.message,
        data: response.data,
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  @Get()
  findAll(): Promise<{ statusCode: number; message: string; data?: any }> {
    return this.userAuthenticationService
      .findAll()
      .then((users) => {
        return {
          statusCode: 200, // OK
          message: 'Users retrieved successfully',
          data: users,
        };
      })
      .catch((error) => {
        return {
          statusCode: 500, // Internal Server Error
          message: 'Error retrieving users',
          data: error,
        };
      });
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<{ statusCode: number; message: string; user?: User }> {
    const { message, status, user } =
      await this.userAuthenticationService.loginUser(username, password);

    return {
      statusCode: status,
      message,
      user,
    };
  }

  @Post('logout/:userId')
  async logoutUser(
    @Param('userId') userId: string,
  ): Promise<{ statusCode: number; message: string }> {
    try {
      await this.userAuthenticationService.logoutUser(userId);
      return {
        statusCode: 200, // OK
        message: 'Logout successful',
      };
    } catch (error) {
      return {
        statusCode: 400, // Bad Request
        message: `Failed to logout: ${error.message}`,
      };
    }
  }

  @Patch(':id/reset-password')
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserAuthenticationDto: UpdateUserAuthenticationDto,
  ): Promise<{ statusCode: number; message: string; user?: User }> {
    try {
      const response = await this.userAuthenticationService.updateUser(
        id,
        updateUserAuthenticationDto.password,
      );

      return {
        statusCode: response.status || 200,
        message: response.message,
        user: response.user,
      };
    } catch (error) {
      return {
        statusCode: error.status || 500,
        message: error.message || 'Error updating password',
      };
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<{ message: string; status?: number }> {
    try {
      await this.userAuthenticationService.remove(+id);
      return {
        message: 'User deleted successfully',
        status: 200,
      };
    } catch (error) {
      return {
        message: 'Failed to delete user: ' + error.message,
        status: 500,
      };
    }
  }
}
