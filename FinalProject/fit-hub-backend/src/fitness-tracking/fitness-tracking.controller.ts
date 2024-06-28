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
} from '@nestjs/common';
import { FitnessTrackingService } from './fitness-tracking.service';
import { CreateFitnessTrackingDto } from './dto/create-fitness-tracking.dto';
import { UpdateFitnessTrackingDto } from './dto/update-fitness-tracking.dto';
import { FitnessExercise, Level, Types } from '@prisma/client';

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
}
