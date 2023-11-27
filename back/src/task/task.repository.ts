import Task from '@entities/task.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TaskCustomRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async findTasksWithResponsibleInfo() {
    return await this.createQueryBuilder('task')
      .select([
        'task.id',
        'task.title',
        'task.description',
        'task.tags',
        'task.created_at',
        'task.updated_at',
      ])
      .leftJoin('task.responsible', 'responsible')
      .addSelect(['responsible.id', 'responsible.name', 'responsible.email'])
      .getMany();
  }

  async findOneTaskWithResponsibleInfo(taskId: number) {
    return await this.createQueryBuilder('task')
      .select([
        'task.id',
        'task.title',
        'task.description',
        'task.tags',
        'task.created_at',
        'task.updated_at',
      ])
      .leftJoin('task.responsible', 'responsible')
      .addSelect(['responsible.id', 'responsible.name', 'responsible.email'])
      .where({ id: taskId })
      .getOne();
  }
}
