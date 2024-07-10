import { Injectable } from '@nestjs/common';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserProfile } from '@prisma/client';

@Injectable()
export class UserProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProfile(
    createUserProfileDto: CreateUserProfileDto,
  ): Promise<UserProfile> {
    const { userId, firstName, lastName, bio, profilePicture } =
      createUserProfileDto;

    return this.prismaService.userProfile.create({
      data: {
        userId,
        firstName,
        lastName,
        bio,
        profilePicture,
      },
      include: {
        user: true,
      },
    });
  }

  async getAllProfiles(): Promise<UserProfile[]> {
    return this.prismaService.userProfile.findMany({
      include: {
        user: true,
      },
    });
  }

  async getProfileByUserId(userId: number): Promise<UserProfile | null> {
    try {
      const userProfile = await this.prismaService.userProfile.findUnique({
        where: {
          userId: userId,
        },
        include: {
          user: true,
        },
      });

      return userProfile;
    } catch (error) {
      console.error('Error retrieving user profile:', error);
      return null;
    }
  }

  async updateProfile(
    userId: string,
    updateUserProfileDto: UpdateUserProfileDto
  ): Promise<UserProfile> {
    const { firstName, lastName, bio, profilePicture } = updateUserProfileDto;
  
    return this.prismaService.userProfile.update({
      where: {
        userId: parseInt(userId, 10)
      },
      data: {
        firstName,
        lastName,
        bio,
        profilePicture
      },
      include: {
        user: true
      }
    });
  } 

  async deleteProfile(userId: number): Promise<UserProfile | null> {
    try {
      const deletedProfile = await this.prismaService.userProfile.delete({
        where: {
          userId,
        },
        include: {
          user: true,
        },
      });

      return deletedProfile;
    } catch (error) {
      console.error('Error deleting user profile:', error);
      return null;
    }
  }
}
