import { PartialType } from '@nestjs/mapped-types';
import { CreateFitnessTrackingDto } from './create-fitness-tracking.dto';

export class UpdateFitnessTrackingDto extends PartialType(CreateFitnessTrackingDto) {}
