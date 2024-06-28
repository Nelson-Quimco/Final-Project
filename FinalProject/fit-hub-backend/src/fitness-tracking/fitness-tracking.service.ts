import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  AddedExerciseDto,
  CreateFitnessTrackingDto,
} from './dto/create-fitness-tracking.dto';
import { UpdateFitnessTrackingDto } from './dto/update-fitness-tracking.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Level, Types, FitnessExercise, AddedExercise } from '@prisma/client';

@Injectable()
export class FitnessTrackingService {
  logger: any;
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
    updateFitnessExerciseDto: UpdateFitnessTrackingDto,
  ): Promise<FitnessExercise> {
    try {
      const updatedFitnessExercise =
        await this.prismaService.fitnessExercise.update({
          where: { id: id },
          data: updateFitnessExerciseDto,
        });
      return updatedFitnessExercise;
    } catch (error) {
      this.logger.error('Error updating fitness exercise:', error);
      throw new InternalServerErrorException(
        'Failed to update fitness exercise',
      );
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

  async addWorkout(
    type: Types,
    level: Level,
    reps: number,
    setDate: string,
  ): Promise<{ data: AddedExercise; status: number }> {
    try {
      const { data: fitnessExercises, status } = await this.findByTypeAndLevel(
        type,
        level,
      );
      if (status === HttpStatus.OK && fitnessExercises.length > 0) {
        const randomIndex = Math.floor(Math.random() * fitnessExercises.length);
        const selectedExercise = fitnessExercises[randomIndex];
        const addedExercise = await this.prismaService.addedExercise.create({
          data: {
            id: selectedExercise.id,
            title: selectedExercise.Name,
            Name: selectedExercise.Name,
            reps: reps,
            setDate: new Date(setDate),
          },
        });
        return {
          data: {
            addedExerciseId: addedExercise.id,
            id: addedExercise.id,
            title: addedExercise.title,
            Name: addedExercise.Name,
            reps: addedExercise.reps,
            setDate: addedExercise.setDate,
          },
          status: HttpStatus.CREATED,
        };
      } else {
        return { data: null, status: status };
      }
    } catch (error) {
      console.error('Error in addWorkout:', error);
      if (error.code === 'P2002') {
        return { data: null, status: HttpStatus.CONFLICT };
      } else {
        return { data: null, status: HttpStatus.INTERNAL_SERVER_ERROR };
      }
    }
  }
}
