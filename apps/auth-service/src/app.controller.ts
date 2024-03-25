import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('/api/auth')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('NATS_SERVICE') private client: ClientProxy,
  ) {}

  @Get('/login')
  getHello(): string {
    console.log('login is here');
    this.client.emit('user_created', { name: 'pera' });
    console.log('login is emitted');
    return this.appService.getHello();
  }
}
