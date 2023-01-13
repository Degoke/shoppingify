import { JwtModule } from "@nestjs/jwt";
import { TestingModule, Test } from "@nestjs/testing";
import { AccountService } from "../../src/account/account.service";
import { mockAccountService } from "../../src/account/mocks";
import { JWTStrategy } from "../../src/common/strategies/jwt.strategy";
import { LocalStrategy } from "../../src/common/strategies/local.strategy"
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { LoginDto } from "./dto/login.dto";

export const mockLOginDto: LoginDto = {
    email: 'testuser@gmail.com',
    password: 'Test_password1'
}

export class mockJwtStrategy extends JWTStrategy {
    validate = jest.fn().mockImplementation(() => ({ userId: "", email: ""}))
  }
  
export class mockLocalStrategy extends LocalStrategy {
    validate = jest.fn().mockImplementation(() => {})
}

export const testingModule = {
    imports: [
      JwtModule.register({
        secret: "secret",
        signOptions: {
          expiresIn: 6000
        }
      })
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService, { provide: JWTStrategy, useValue: mockJwtStrategy }, { provide: LocalStrategy, useValue: mockLocalStrategy }, { provide: AccountService, useFactory: mockAccountService }],
  }