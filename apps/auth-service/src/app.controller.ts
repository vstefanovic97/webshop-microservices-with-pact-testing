import { Controller, Inject, Post, Body, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/auth')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('NATS_SERVICE') private client: ClientProxy,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.appService.login(loginDto);
  }
}
