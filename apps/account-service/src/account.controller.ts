import { Controller, Post, BadRequestException, Body } from '@nestjs/common';
import { RegisterDTO } from './dto/register';
import { AccountService } from './account.service';

@Controller('/api/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('register')
  async register(@Body() newUser: RegisterDTO) {
    const existingUser = await this.accountService.findByEmail(newUser.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    return this.accountService.register(newUser);
  }
}
