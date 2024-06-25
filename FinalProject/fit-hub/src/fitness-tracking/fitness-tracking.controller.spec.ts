import { Test, TestingModule } from '@nestjs/testing';
import { FitnessTrackingController } from './fitness-tracking.controller';
import { FitnessTrackingService } from './fitness-tracking.service';

describe('FitnessTrackingController', () => {
  let controller: FitnessTrackingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FitnessTrackingController],
      providers: [FitnessTrackingService],
    }).compile();

    controller = module.get<FitnessTrackingController>(FitnessTrackingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
