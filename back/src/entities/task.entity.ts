import CreateTaskDto from '@dtos/task/create-task.dto';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './user.entity';

@Entity({ name: 'tasks' })
export default class Task {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  tags: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'responsibleId' })
  responsible: User;

  @Column({ name: 'responsibleId', nullable: true, default: null })
  responsibleId: number;

  @Column({ type: 'text', default: () => 'current_timestamp' })
  created_at: string;

  @Column({ type: 'text', default: () => 'current_timestamp' })
  updated_at: string;

  constructor(props: CreateTaskDto) {
    Object.assign(this, {
      ...props,
    });
  }

  static async create(props: CreateTaskDto) {
    return new Task({
      ...props,
      tags: JSON.stringify(props.tags),
    });
  }
}
