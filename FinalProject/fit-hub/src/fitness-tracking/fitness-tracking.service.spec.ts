import { Test, TestingModule } from '@nestjs/testing';
import { FitnessTrackingService } from './fitness-tracking.service';

describe('FitnessTrackingService', () => {
  let service: FitnessTrackingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FitnessTrackingService],
    }).compile();

    service = module.get<FitnessTrackingService>(FitnessTrackingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
