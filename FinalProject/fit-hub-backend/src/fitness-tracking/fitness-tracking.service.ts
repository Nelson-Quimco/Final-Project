import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateFitnessTrackingDto } from './dto/create-fitness-tracking.dto';
import { UpdateFitnessTrackingDto } from './dto/update-fitness-tracking.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Level,
  Types,
  FitnessExercise,
  AddedExercise,
  Prisma,
  IsCompleted,
  User,
} from '@prisma/client';

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

  async addExercise(
    fitnessExerciseId: number,
    reps: number,
    setDate: string,
  ): Promise<{ data: AddedExercise; statusCode: number }> {
    try {
      const fitnessExercise =
        await this.prismaService.fitnessExercise.findUnique({
          where: {
            id: fitnessExerciseId,
          },
        });

      if (!fitnessExercise) {
        return {
          data: null,
          statusCode: 404,
        };
      }

      const newAddedExercise = await this.prismaService.addedExercise.create({
        data: {
          id: fitnessExercise.id,
          title: fitnessExercise.Name,
          Name: fitnessExercise.Name,
          reps: reps,
          setDate: new Date(setDate).toISOString(),
        },
      });

      return {
        data: newAddedExercise,
        statusCode: 201,
      };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        statusCode: 500,
      };
    }
  }

  async getExercises(
    userId: number,
  ): Promise<{ data: AddedExercise[]; statusCode: number }> {
    try {
      const fitnessExerciseIds = await this.prismaService.fitnessExercise
        .findMany({
          where: {
            userId: userId,
          },
          select: {
            id: true,
          },
        })
        .then((exercises) => exercises.map((exercise) => exercise.id));

      const addedExercises = await this.prismaService.addedExercise.findMany({
        where: {
          id: {
            in: fitnessExerciseIds,
          },
        },
      });

      return {
        data: addedExercises,
        statusCode: 200,
      };
    } catch (error) {
      console.error(error);
      return {
        data: [],
        statusCode: 500,
      };
    }
  }
  async isCompleted(
    addedExerciseId: number,
    Name: string,
    reps: number,
    isComplete: boolean,
  ): Promise<{ data: IsCompleted; statusCode: number }> {
    try {
      const createdIsCompleted = await this.prismaService.isCompleted.create({
        data: {
          addedExerciseId,
          Name,
          reps,
          isComplete,
        },
      });

      await this.prismaService.addedExercise.update({
        where: {
          addedExerciseId: addedExerciseId,
        },
        data: {
          isComplete: isComplete,
        },
      });

      return {
        data: createdIsCompleted,
        statusCode: 200,
      };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        statusCode: 500,
      };
    }
  }

  async getExerciseById(id: number): Promise<FitnessExercise> {
    try {
      const fitnessExercise =
        await this.prismaService.fitnessExercise.findUnique({
          where: {
            id: id,
          },
          include: {
            user: true,
            progresses: true,
          },
        });

      if (!fitnessExercise) {
        throw new NotFoundException(
          `Fitness exercise with ID ${id} not found.`,
        );
      }

      return fitnessExercise;
    } catch (error) {
      throw new Error(
        `Error retrieving fitness exercise by ID: ${error.message}`,
      );
    }
  }

  async updateAddedExercise(
    addedExerciseId: number,
    reps: number,
    setDate: string,
  ): Promise<{ data: AddedExercise | null; statusCode: number }> {
    try {
      const existingAddedExercise =
        await this.prismaService.addedExercise.findUnique({
          where: {
            addedExerciseId: addedExerciseId,
          },
        });

      if (!existingAddedExercise) {
        return {
          data: null,
          statusCode: 404,
        };
      }

      const updatedAddedExercise =
        await this.prismaService.addedExercise.update({
          where: {
            addedExerciseId: addedExerciseId,
          },
          data: {
            reps: reps,
            setDate: new Date(setDate).toISOString(),
          },
        });

      return {
        data: updatedAddedExercise,
        statusCode: 200,
      };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        statusCode: 500,
      };
    }
  }

  async deleteExercise(
    @Param('addedExerciseId', ParseIntPipe) addedExerciseId: number,
  ): Promise<{ data: boolean; message: string; statusCode: number }> {
    try {
      await this.prismaService.addedExercise.delete({
        where: {
          addedExerciseId: addedExerciseId,
        },
      });
      return {
        data: true,
        message: 'Exercise deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        data: false,
        message: 'Error deleting exercise',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async createFitnessExerciseForAllUsers(
    level: Level,
    type: Types,
    name: string,
    description: string,
  ): Promise<FitnessExercise[]> {
    const users = await this.prismaService.user.findMany();

    const promises = users.map(async (user) => {
      return this.prismaService.fitnessExercise.create({
        data: {
          Level: level,
          Type: type,
          Name: name,
          Description: description,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: user.userId,
        },
      });
    });

    return Promise.all(promises);
  }
}
