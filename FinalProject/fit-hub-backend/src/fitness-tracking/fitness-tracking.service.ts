import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFitnessTrackingDto } from './dto/create-fitness-tracking.dto';
import { UpdateFitnessTrackingDto } from './dto/update-fitness-tracking.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Level, Types, FitnessExercise } from '@prisma/client';

@Injectable()
export class FitnessTrackingService {
  constructor(private readonly prismaService: PrismaService) {}

  async createFitnessExercise(
    level: Level,
    type: Types,
    name: string,
    description: string,
    userId: number,
  ): Promise<FitnessExercise> {
    return this.prismaService.fitnessExercise.create({
      data: {
        Level: level,
        Type: type,
        Name: name,
        Description: description,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: { connect: { userId: userId } },
        progresses: {
          create: [],
        },
      },
    });
  }

  async create(createFitnessExerciseDto: CreateFitnessTrackingDto) {
    try {
      const { userId, Level, Type, Name, Description } =
        createFitnessExerciseDto;

      const fitnessExercise = await this.createFitnessExercise(
        Level,
        Type,
        Name,
        Description,
        userId,
      );

      return {
        data: fitnessExercise,
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new Error(`Error creating fitness exercise: ${error.message}`);
    }
  }

  async findAll(): Promise<{ data: FitnessExercise[]; status: number }> {
    try {
      const fitnessExercises =
        await this.prismaService.fitnessExercise.findMany();
      return { data: fitnessExercises, status: HttpStatus.OK };
    } catch (error) {
      return { data: [], status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  async findByTypeAndLevel(
    type: Types,
    level: Level,
  ): Promise<{ data: FitnessExercise[]; status: number }> {
    try {
      const fitnessExercises =
        await this.prismaService.fitnessExercise.findMany({
          where: {
            Type: type,
            Level: level,
          },
        });
      return { data: fitnessExercises, status: HttpStatus.OK };
    } catch (error) {
      return { data: [], status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  async update(
    id: number,
    updateFitnessTrackingDto: UpdateFitnessTrackingDto,
  ): Promise<{ data: FitnessExercise; status: number }> {
    try {
      const updatedFitnessExercise =
        await this.prismaService.fitnessExercise.update({
          where: {
            id: id,
          },
          data: {
            ...updateFitnessTrackingDto,
            updatedAt: new Date(),
          },
          include: {
            user: true,
            progresses: true,
          },
        });

      return {
        data: updatedFitnessExercise,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        data: null,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async remove(id: number): Promise<{ message: string; status: number }> {
    try {
      await this.prismaService.fitnessExercise.delete({
        where: {
          id: id,
        },
      });

      return {
        message: `Fitness exercise with ID ${id} deleted successfully.`,
        status: 200,
      };
    } catch (error) {
      throw new HttpException(
        `Error deleting fitness exercise with ID ${id}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
