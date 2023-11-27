import CreateTaskDto from '@dtos/task/create-task.dto';
import Task from '@entities/task.entity';
import { HttpException, Injectable } from '@nestjs/common';
import UserService from '@user/user.service';
import { TaskCustomRepository } from './task.repository';

@Injectable()
export default class TaskService {
  constructor(
    private readonly taskRepository: TaskCustomRepository,
    private readonly userService: UserService,
  ) {}

  async getAllTasks() {
    const tasks = await this.taskRepository.findTasksWithResponsibleInfo();

    tasks.forEach((task: Task) => {
      task.tags = JSON.parse(task.tags);
    });

    return tasks;
  }

  async createTask(data: CreateTaskDto) {
    if (!(await this.userService.getUserById(data.responsibleId)))
      throw new HttpException('User not found', 404);

    return await this.taskRepository.save(await Task.create(data));
  }
}
