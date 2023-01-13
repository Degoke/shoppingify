import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '../../src/account/account.service';
import { JWTStrategy } from '../../src/common/strategies/jwt.strategy';
import { LocalStrategy } from '../../src/common/strategies/local.strategy';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { mockLOginDto, testingModule } from './mock';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(testingModule).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe("login", () => {
    it("should login user with correct details", async () => {
      const response = await controller.login(mockLOginDto)
      expect(response?.access_token).toBeDefined()
    })
  })
});
