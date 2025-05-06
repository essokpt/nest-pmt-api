import { Test, TestingModule } from '@nestjs/testing';
import { StoreTypeController } from './store-type.controller';
import { StoreTypeService } from './store-type.service';

describe('StoreTypeController', () => {
  let controller: StoreTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreTypeController],
      providers: [StoreTypeService],
    }).compile();

    controller = module.get<StoreTypeController>(StoreTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
