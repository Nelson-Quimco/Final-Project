import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  ParseIntPipe,
  Res,
  NotFoundException,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { FitnessTrackingService } from './fitness-tracking.service';
import {
  CreateFitnessExerciseDto,
  CreateFitnessTrackingDto,
  IsCompletedDto,
} from './dto/create-fitness-tracking.dto';
import { UpdateFitnessTrackingDto } from './dto/update-fitness-tracking.dto';
import { AddedExercise, FitnessExercise, Level, Types } from '@prisma/client';

interface AddWorkoutDto {
  type: Types;
  level: Level;
  reps: number;
  setDate: string;
  title: string;
}

class AddExerciseDto {
  fitnessExerciseId: number;
  reps: number;
  setDate: string;
  userId: number;
}

@Controller('fitness-tracking')
export class FitnessTrackingController {
  logger: any;
  constructor(
    private readonly fitnessTrackingService: FitnessTrackingService,
  ) {}

  @Post('create-exercise')
  @HttpCode(201)
  create(@Body() createFitnessTrackingDto: CreateFitnessTrackingDto) {
    try {
      return this.fitnessTrackingService.create(createFitnessTrackingDto);
    } catch (error) {
      throw new HttpException(
        'Error creating exercise',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<{ data: FitnessExercise[]; status: number }> {
    try {
      return await this.fitnessTrackingService.findAll();
    } catch (error) {
      throw new HttpException(
        `Error finding all fitness exercises`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFitnessExerciseDto: UpdateFitnessTrackingDto,
  ): Promise<FitnessExercise> {
    try {
      return await this.fitnessTrackingService.update(
        id,
        updateFitnessExerciseDto,
      );
    } catch (error) {
      this.logger.error('Error updating fitness exercise:', error);
      throw new InternalServerErrorException(
        'Failed to update fitness exercise',
      );
    }
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(
    @Param('id') id: string,
  ): Promise<{ message: string; status: number }> {
    try {
      const deletedFitnessExercise =
        await this.fitnessTrackingService.remove(+id);
      return {
        message: `Fitness exercise with ID ${id} deleted successfully.`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: `Error deleting fitness exercise with ID ${id}: ${error.message}`,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Get('/type/:type/level/:level')
  async findByTypeAndLevel(
    @Param('type') type: Types,
    @Param('level') level: Level,
  ): Promise<{ data: FitnessExercise[]; status: number }> {
    try {
      return await this.fitnessTrackingService.findByTypeAndLevel(type, level);
    } catch (error) {
      throw new HttpException(
        `Error finding fitness exercises by type '${type}' and level '${level}': ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('add-workout')
  async addExercise(
    @Body('fitnessExerciseId') fitnessExerciseId: number,
    @Body('reps') reps: number,
    @Body('userId') userId: number,
    @Body('setDate') setDate: string,
  ): Promise<{ data: AddedExercise; statusCode: number }> {
    const { data, statusCode } = await this.fitnessTrackingService.addExercise(
      fitnessExerciseId,
      reps,
      setDate,
      userId,
    );

    if (statusCode === 201) {
      return { data, statusCode };
    } else if (statusCode === 404) {
      throw new NotFoundException('FitnessExercise not found');
    } else {
      throw new InternalServerErrorException('Failed to add exercise');
    }
  }

  @Get(':userId')
  async getExercises(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<{ data: AddedExercise[]; statusCode: number }> {
    try {
      const { data, statusCode } =
        await this.fitnessTrackingService.getExercises(userId);
      return { data, statusCode };
    } catch (error) {
      console.error(error);
      return {
        data: [],
        statusCode: 500,
      };
    }
  }

  @Post('isCompleted')
  async createIsCompleted(@Body() isCompletedDto: IsCompletedDto) {
    const { addedExerciseId, name, reps, isComplete } = isCompletedDto;
    const { data, statusCode } = await this.fitnessTrackingService.isCompleted(
      addedExerciseId,
      name,
      reps,
      isComplete,
    );
    return { data, statusCode };
  }

  @Get('get-exercise/:id')
  @HttpCode(HttpStatus.OK)
  async getFitnessExercise(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FitnessExercise> {
    try {
      return await this.fitnessTrackingService.getExerciseById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new Error(
          `Error retrieving fitness exercise by ID: ${error.message}`,
        );
      }
    }
  }

  @Patch('update-addedExercise/:addedExerciseId')
  async updateAddedExercise(
    @Param('addedExerciseId', ParseIntPipe) addedExerciseId: number,
    @Body('reps', ParseIntPipe) reps: number,
    @Body('setDate') setDate: string,
  ): Promise<{ data: AddedExercise | null; statusCode: number }> {
    try {
      const { data, statusCode } =
        await this.fitnessTrackingService.updateAddedExercise(
          addedExerciseId,
          reps,
          setDate,
        );

      if (statusCode === 404) {
        throw new NotFoundException(
          `Added exercise with ID ${addedExerciseId} not found.`,
        );
      }

      if (statusCode === 500) {
        throw new InternalServerErrorException(
          'Error updating added exercise.',
        );
      }

      return { data, statusCode };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }

      throw new BadRequestException('Invalid input data.');
    }
  }

  @Delete('delete-addedExercise/:addedExerciseId')
  async deleteExercise(
    @Param('addedExerciseId', ParseIntPipe) addedExerciseId: number,
  ): Promise<{ data: boolean; statusCode: number }> {
    return await this.fitnessTrackingService.deleteExercise(addedExerciseId);
  }

  //create a fitness exercise to all users

  @Post('create-fitnessExercises')
  async createFitnessExerciseForAllUsers(
    @Body() createFitnessExerciseDto: CreateFitnessExerciseDto,
  ): Promise<FitnessExercise[]> {
    const { level, type, name, description } = createFitnessExerciseDto;
    return this.fitnessTrackingService.createFitnessExerciseForAllUsers(
      level,
      type,
      name,
      description,
    );
  }

  @Post('add-usersWorkout/:fitnessExerciseId')
  async createAddedExercise(
    @Param('fitnessExerciseId', ParseIntPipe) fitnessExerciseId: number,
    @Body('reps') reps: number,
    @Body('setDate') setDate: string,
    @Body('userId') userId: number,
    @Res() res,
  ): Promise<{ data: AddedExercise; statusCode: number }> {
    const { data, statusCode } = await this.fitnessTrackingService.addExercises(
      fitnessExerciseId,
      reps,
      setDate,
      userId,
    );

    if (statusCode === 404) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Fitness exercise or user not found' });
    }

    if (statusCode === 500) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error creating added exercise' });
    }

    return res.status(HttpStatus.CREATED).json(data);
  }
}
