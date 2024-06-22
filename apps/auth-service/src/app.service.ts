import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UserEntity } from './db/entities/user.entity';
import { compare } from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{
    email: string;
    id: number;
  } | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await compare(password, user.password))) {
      const { email, id } = user;
      return {
        email,
        id,
      };
    }

    return null;
  }

  async login(user: { email: string; id: string }) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async addNewUser(user: any) {
    this.userRepository.save([user]);
  }
}
