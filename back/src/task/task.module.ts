import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@user/user.module';
import Task from '../entities/task.entity';
import TaskController from './task.controller';
import { TaskCustomRepository } from './task.repository';
import TaskService from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UserModule],
  controllers: [TaskController],
  providers: [TaskCustomRepository, TaskService],
  exports: [TaskService],
})
export class TaskModule {}
