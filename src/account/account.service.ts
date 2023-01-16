import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountRepository } from './repositories/account.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  async findByEmail(email: string) {
    try {
      return await this.accountRepository.findByEmail(email);
    } catch (error) {
      throw error;
    }
  }

  async createAccount(createAccountDto: CreateAccountDto) {
    try {
      const existingAccount = await this.accountRepository.findByEmail(
        createAccountDto.email,
      );

      if (existingAccount) {
        throw new BadRequestException('Email already in use');
      }

      const password = await bcrypt.hash(createAccountDto.password, 10);

      const newAccount = await this.accountRepository.create({
        ...createAccountDto,
        password,
      });
      await this.accountRepository.save(newAccount);

      return newAccount;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.accountRepository.findOneBy({ id });
    } catch (error) {
      throw error;
    }
  }
}
