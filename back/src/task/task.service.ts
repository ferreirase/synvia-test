import CreateTaskDto from '@dtos/task/create-task.dto';
import UpdateTaskDto from '@dtos/task/update-task.dto';
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

  async getTaskById(taskId: number) {
    const taskFound =
      await this.taskRepository.findOneTaskWithResponsibleInfo(taskId);

    if (!taskFound) throw new HttpException('Task not found', 404);

    taskFound.tags = JSON.parse(taskFound.tags);

    return taskFound;
  }

  async createTask(data: CreateTaskDto) {
    if (
      data.responsibleId &&
      !(await this.userService.getUserById(data.responsibleId))
    )
      throw new HttpException('User not found', 404);

    return await this.taskRepository.save(await Task.create(data));
  }

  async deleteTask(taskId: number) {
    const taskFound = await this.taskRepository.findOneBy({ id: taskId });

    if (!taskFound) throw new HttpException('Task not found', 404);

    return await this.taskRepository.delete(taskId);
  }

  async updateTask(taskId: number, data: UpdateTaskDto) {
    if (
      data.responsibleId &&
      !(await this.userService.getUserById(data.responsibleId))
    ) {
      throw new HttpException('Responsible user not found', 404);
    }

    const taskFound = await this.taskRepository.findOneBy({ id: taskId });

    if (!taskFound) throw new HttpException('Task not found', 404);

    taskFound.responsibleId = data.responsibleId;

    taskFound.tags =
      data.tags && data.tags.length > 0
        ? JSON.stringify([...new Set([...data.tags])])
        : taskFound.tags;

    taskFound.title = data.title ? data.title : taskFound.title;

    taskFound.description = data.description
      ? data.description
      : taskFound.description;

    return await this.taskRepository.save(taskFound);
  }
}
