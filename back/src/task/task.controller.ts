import CreateTaskDto from '@dtos/task/create-task.dto';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreateTaskSchema } from '@shared/validations/task-schema-validations';
import { JoiValidationPipe } from '@shared/validations/validation.pipe';
import TaskService from '@task/task.service';

@Controller('/tasks')
export default class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/')
  @UsePipes(new JoiValidationPipe(CreateTaskSchema))
  async signup(@Body() body: CreateTaskDto): Promise<any | HttpException> {
    return { user: await this.taskService.createTask(body) };
  }

  @Get('/')
  @UsePipes(new JoiValidationPipe(CreateTaskSchema))
  async getAllTasks(): Promise<any | HttpException> {
    return { tasks: await this.taskService.getAllTasks() };
  }
}
