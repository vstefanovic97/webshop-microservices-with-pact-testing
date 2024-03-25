import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AccountController {
  @EventPattern('user_created')
  async handleUserCreated(data: Record<string, unknown>) {
    console.log('user was created', data);
    // business logic
  }
}
