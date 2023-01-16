import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Logger,
  Request,
} from '@nestjs/common';
import { Public } from '../../src/common/decorators/public.decorator';
import { LocalAuthGaurd } from '../../src/common/gaurds/local_auth.gaurd';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(LocalAuthGaurd)
  @Public()
  @Post('login')
  login(@Request() req: any) {
    return this.authenticationService.login(req.user);
  }
}
