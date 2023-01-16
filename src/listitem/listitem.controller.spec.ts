import { Test, TestingModule } from '@nestjs/testing';
import { ListitemController } from './listitem.controller';
import { ListitemService } from './listitem.service';

describe('ListitemController', () => {
  let controller: ListitemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListitemController],
      providers: [ListitemService],
    }).compile();

    controller = module.get<ListitemController>(ListitemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
