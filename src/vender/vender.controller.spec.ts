import { Test, TestingModule } from '@nestjs/testing';
import { VenderController } from './vender.controller';
import { VenderService } from './vender.service';

describe('VenderController', () => {
  let controller: VenderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VenderController],
      providers: [VenderService],
    }).compile();

    controller = module.get<VenderController>(VenderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
