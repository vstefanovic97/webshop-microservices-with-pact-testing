import {
  Controller,
  Post,
  Get,
  BadRequestException,
  Body,
  UseGuards,
  Request,
  UsePipes,
} from '@nestjs/common';
import { RegisterDTO } from './dto/register';
import { AccountService } from './account.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RemovePasswordPipe } from './remove-password.pipe';

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

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @UsePipes(RemovePasswordPipe)
  async getProfile(@Request() req: any) {
    return this.accountService.findByEmail(req.user.email);
  }
}
