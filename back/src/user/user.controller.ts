import { Public } from '@auth/decorators/isPublic';
import CreateUserDto from '@dtos/user/create-user.dto';
import {
  Body,
  Controller,
  HttpException,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreateUserSchema } from '@shared/validations/user-schema-validations';
import { JoiValidationPipe } from '@shared/validations/validation.pipe';
import UserService from '@user/user.service';

@Controller()
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('/signup')
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  async signup(@Body() body: CreateUserDto): Promise<any | HttpException> {
    return { user: await this.userService.createUser(body) };
  }
}
