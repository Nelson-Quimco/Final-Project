import { Module } from '@nestjs/common';
import { FitnessTrackingService } from './fitness-tracking.service';
import { FitnessTrackingController } from './fitness-tracking.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FitnessTrackingController],
  providers: [FitnessTrackingService],
})
export class FitnessTrackingModule {}
