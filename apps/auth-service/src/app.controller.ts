import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { EventPattern } from '@nestjs/microservices';
import { RegisterDTO } from './dto/register';
@Controller('/api/auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: { email: string; id: string }) {
    return this.appService.login(user);
  }

  @EventPattern('user_created')
  async handleUserCreated(newUser: RegisterDTO) {
    return this.appService.addNewUser(newUser);
  }
}
