import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import { AccountRepository } from './repositories/account.repository';
import * as bcrypt from 'bcrypt';
import { CreateAccountDto } from './dto/create-account.dto';
import { mockAccount } from 'src/common/mocks/mock_data';

export const mockCreateAccountDto: CreateAccountDto = {
  email: 'testuser2@gmail.com',
  password: 'Test_password1',
};

export const mockAccountService = () => ({
  findByEmail: jest.fn(() => mockAccount),
});

export const mockAccountRepository = () => ({
  findByEmail: jest.fn(() => mockAccount),
  create: jest.fn((payload) => ({
    ...mockAccount,
    email: payload.email,
  })),
  save: jest.fn(),
});

export const testingModule = {
  controllers: [AccountController],
  providers: [
    AccountService,
    { provide: AccountRepository, useFactory: mockAccountRepository },
  ],
};
