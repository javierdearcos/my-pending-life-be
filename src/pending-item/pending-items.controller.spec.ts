import { Test, TestingModule } from '@nestjs/testing';
import { PendingItemsController } from './pending-items.controller';
import { PendingItemsService } from './pending-items.service';

describe('PendingItemsController', () => {
  let controller: PendingItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PendingItemsController],
      providers: [PendingItemsService],
    }).compile();

    controller = module.get<PendingItemsController>(PendingItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
