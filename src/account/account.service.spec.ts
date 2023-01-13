import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { resolveSoa } from 'dns';
import { mockLOginDto } from '../../src/authentication/mock';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import { mockAccount, mockCreateAccountDto, testingModule } from './mocks';
import { AccountRepository } from './repositories/account.repository';

describe('AccountService', () => {
  let service: AccountService;
  let accountRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(testingModule).compile();

    service = module.get<AccountService>(AccountService);
    accountRepository = module.get(AccountRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find by email', async () => {
    const response = await service.findByEmail(mockLOginDto.email)
    expect(response).toBe(mockAccount)
  })

  describe("create account", () => {
    it('should throw exception when email exists', async() => {
      await expect(service.createAccount(mockLOginDto)).rejects.toThrow(BadRequestException)
    })

    it("should create account when email does not exist", async () => {
      accountRepository.findByEmail = jest.fn((email) => new Promise((resolve) => resolve(null)))
      const response = await service.createAccount(mockCreateAccountDto)
      expect(response.email).toBe(mockCreateAccountDto.email)
    })
  })
});
