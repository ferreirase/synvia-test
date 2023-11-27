import CreateTaskDto from '@dtos/task/create-task.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreateTaskSchema } from '@shared/validations/task-schema-validations';
import { JoiValidationPipe } from '@shared/validations/validation.pipe';
import TaskService from '@task/task.service';
import UpdateTaskDto from '../dtos/task/update-task.dto';

@Controller('/tasks')
export default class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/')
  @UsePipes(new JoiValidationPipe(CreateTaskSchema))
  async signup(@Body() body: CreateTaskDto): Promise<any | HttpException> {
    return { user: await this.taskService.createTask(body) };
  }

  @Get('/')
  async getAllTasks(): Promise<any | HttpException> {
    return { tasks: await this.taskService.getAllTasks() };
  }

  @Get('/:taskId')
  async getTaskById(
    @Param('taskId') taskId: number,
  ): Promise<any | HttpException> {
    return { task: await this.taskService.getTaskById(taskId) };
  }

  @Patch('/:taskId')
  async updateTask(
    @Param('taskId') taskId: number,
    @Body() data: UpdateTaskDto,
  ): Promise<any | HttpException> {
    return { task: await this.taskService.updateTask(taskId, data) };
  }

  @Delete('/:taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTask(
    @Param('taskId') taskId: number,
  ): Promise<any | HttpException> {
    if (!taskId || !Number(taskId))
      throw new HttpException('Task ID param is invalid', 400);

    await this.taskService.deleteTask(Number(taskId));
  }
}
