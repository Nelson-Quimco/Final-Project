import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FitnessTrackingService } from './fitness-tracking.service';
import { CreateFitnessTrackingDto } from './dto/create-fitness-tracking.dto';
import { UpdateFitnessTrackingDto } from './dto/update-fitness-tracking.dto';

@Controller('fitness-tracking')
export class FitnessTrackingController {
  constructor(private readonly fitnessTrackingService: FitnessTrackingService) {}

  @Post()
  create(@Body() createFitnessTrackingDto: CreateFitnessTrackingDto) {
    return this.fitnessTrackingService.create(createFitnessTrackingDto);
  }

  @Get()
  findAll() {
    return this.fitnessTrackingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fitnessTrackingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFitnessTrackingDto: UpdateFitnessTrackingDto) {
    return this.fitnessTrackingService.update(+id, updateFitnessTrackingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fitnessTrackingService.remove(+id);
  }
}
