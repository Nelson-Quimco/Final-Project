import { Test, TestingModule } from '@nestjs/testing';
import { UserAuthenticationController } from './user-authentication.controller';
import { UserAuthenticationService } from './user-authentication.service';

describe('UserAuthenticationController', () => {
  let controller: UserAuthenticationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAuthenticationController],
      providers: [UserAuthenticationService],
    }).compile();

    controller = module.get<UserAuthenticationController>(UserAuthenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
