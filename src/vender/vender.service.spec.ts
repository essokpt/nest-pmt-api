import { Test, TestingModule } from '@nestjs/testing';
import { VenderService } from './vender.service';

describe('VenderService', () => {
  let service: VenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VenderService],
    }).compile();

    service = module.get<VenderService>(VenderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
