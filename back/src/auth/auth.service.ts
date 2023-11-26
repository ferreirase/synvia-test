import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserService from '@user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    if (user && (await compare(password, user.password))) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }

    return null;
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      }),
      ...payload,
    };
  }
}
