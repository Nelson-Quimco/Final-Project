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
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfile } from '@prisma/client';

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post('create-profile')
  async create(
    @Body() createUserProfileDto: CreateUserProfileDto,
  ): Promise<UserProfile> {
    return this.userProfileService.createProfile(createUserProfileDto);
  }

  @Get('get-userProfile')
  async findAll(): Promise<UserProfile[]> {
    return this.userProfileService.getAllProfiles();
  }

  @Get('get-userProfileById/:userId')
  async getProfileByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserProfile | null> {
    return this.userProfileService.getProfileByUserId(userId);
  }

  @Patch('update-profile/:userId')
  async updateProfile(
    @Param('userId') userId: string,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    return this.userProfileService.updateProfile(userId, updateUserProfileDto);
  }

  @Delete('delete-userProfile/:userId')
  async deleteProfile(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserProfile | null> {
    return this.userProfileService.deleteProfile(userId);
  }
}
