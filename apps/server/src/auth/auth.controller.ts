import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() body: any) {
    const user = await this.usersService.create(body);
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  async updateUser(@Request() req, @Body() body: any) {
    return this.usersService.updateUser(req.user.userId, body);
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleAuth() {}

  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  async googleAuthRedirect(@Request() req, @Res() res: Response) {
    const token = await this.authService.login(req.user);

    res.redirect(
      `http://localhost:5173/oauth-success?token=${token.access_token}`,
    );
  }
}
