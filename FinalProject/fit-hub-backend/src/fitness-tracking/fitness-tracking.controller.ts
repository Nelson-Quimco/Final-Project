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
} from '@nestjs/common';
import { FitnessTrackingService } from './fitness-tracking.service';
import {
  CreateFitnessTrackingDto,
  IsCompletedDto,
} from './dto/create-fitness-tracking.dto';
import { UpdateFitnessTrackingDto } from './dto/update-fitness-tracking.dto';
import {
  AddedExercise,
  FitnessExercise,
  IsCompleted,
  Level,
  Types,
  User,
} from '@prisma/client';

interface AddWorkoutDto {
  type: Types;
  level: Level;
  reps: number;
  setDate: string;
  title: string;
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
    @Body('setDate') setDate: string,
  ): Promise<{ data: AddedExercise; statusCode: number }> {
    const { data, statusCode } = await this.fitnessTrackingService.addExercise(
      fitnessExerciseId,
      reps,
      setDate,
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
}
