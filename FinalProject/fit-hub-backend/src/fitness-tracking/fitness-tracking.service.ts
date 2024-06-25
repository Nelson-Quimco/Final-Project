import { Injectable } from '@nestjs/common';
import { CreateFitnessTrackingDto } from './dto/create-fitness-tracking.dto';
import { UpdateFitnessTrackingDto } from './dto/update-fitness-tracking.dto';

@Injectable()
export class FitnessTrackingService {
  create(createFitnessTrackingDto: CreateFitnessTrackingDto) {
    return 'This action adds a new fitnessTracking';
  }

  findAll() {
    return `This action returns all fitnessTracking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fitnessTracking`;
  }

  update(id: number, updateFitnessTrackingDto: UpdateFitnessTrackingDto) {
    return `This action updates a #${id} fitnessTracking`;
  }

  remove(id: number) {
    return `This action removes a #${id} fitnessTracking`;
  }
}
