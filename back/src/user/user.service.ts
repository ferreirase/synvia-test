import CreateUserDto from '@dtos/user/create-user.dto';
import User from '@entities/user.entity';
import { HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export default class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto) {
    if (await this.getUserByEmail(data.email))
      throw new HttpException('E-mail already exists', 400);
    const newUser = await this.userRepository.save(await User.create(data));

    delete newUser.password;

    return newUser;
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }
}
