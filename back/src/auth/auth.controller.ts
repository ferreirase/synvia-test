import { Public } from '@auth/decorators/isPublic';
import { Controller, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  Request as IRequestExpress,
  Response as IResponseExpress,
} from 'express-serve-static-core';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Public()
  @Post('auth/login')
  async login(
    @Request() req: IRequestExpress,
    @Response() res: IResponseExpress,
  ) {
    return res.json({
      user: await this.authService.login(req.user),
    });
  }
}
