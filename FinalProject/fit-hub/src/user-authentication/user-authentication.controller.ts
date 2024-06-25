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
  create(@Body() createUserAuthenticationDto: CreateUserAuthenticationDto) {
    const { firstName, lastName, username, password, email } =
      createUserAuthenticationDto;
    return this.userAuthenticationService.create(
      firstName,
      lastName,
      username,
      password,
      email,
    );
  }

  @Get()
  findAll() {
    return this.userAuthenticationService.findAll();
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<{ message: string; user?: User }> {
    return this.userAuthenticationService.loginUser(username, password);
  }

  @Post('logout/:userId')
  async logoutUser(
    @Param('userId') userId: string,
  ): Promise<{ message: string }> {
    try {
      await this.userAuthenticationService.logoutUser(userId);
      return { message: 'Logout successful' };
    } catch (error) {
      throw new HttpException(
        `Failed to logout: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAuthenticationService.findOne(+id);
  }

  @Patch(':id/reset-password')
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserAuthenticationDto: UpdateUserAuthenticationDto,
  ): Promise<{ message: string; user?: User }> {
    return this.userAuthenticationService.updateUser(
      id,
      updateUserAuthenticationDto.password,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAuthenticationService.remove(+id);
  }
}
