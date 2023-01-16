import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '../../src/account/account.service';
import { JWTStrategy } from '../../src/common/strategies/jwt.strategy';
import { LocalStrategy } from '../../src/common/strategies/local.strategy';
import { AuthenticationService } from './authentication.service';
import { mockLOginDto, testingModule } from './mock';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      testingModule,
    ).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate user', async () => {
    const response = await service.validateUser(
      mockLOginDto.email,
      mockLOginDto.password,
    );
    expect(response?.user.email).toBe(mockLOginDto.email);
  });

  describe('login', () => {
    it('should login with valid details', async () => {
      const response = await service.login(mockLOginDto);
      expect(response.access_token).toBeDefined();
    });
  });
});
