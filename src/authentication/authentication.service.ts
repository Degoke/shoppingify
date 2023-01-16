import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccountService } from '../../src/account/account.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await this.accountService.findByEmail(email);

      if (user && (await bcrypt.compare(password, user.password))) {
        return {
          user,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async login(user: any) {
    const payload = { email: user.user.email, sub: user.user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
