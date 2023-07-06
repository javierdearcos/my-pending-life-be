import { Test, TestingModule } from '@nestjs/testing';
import { PendingItemsService } from './pending-items.service';

describe('PendingItemsService', () => {
  let service: PendingItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PendingItemsService],
    }).compile();

    service = module.get<PendingItemsService>(PendingItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
