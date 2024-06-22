import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterDTO } from './dto/register';
import { UserEntity } from './db/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class AccountService {
  constructor(
    @Inject('NATS_SERVICE') private client: ClientProxy,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async register(newUser: RegisterDTO): Promise<UserEntity> {
    const hashedPassword = await hash(newUser.password, 10);

    const user = this.userRepository.create({
      ...newUser,
      password: hashedPassword,
    });

    const createdUser = await this.userRepository.save(user);

    this.client.emit('user_created', createdUser);

    return createdUser;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
