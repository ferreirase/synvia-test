import CreateUserDto from '@dtos/user/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Task from './task.entity';

@Entity({ name: 'users' })
export default class User {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.responsible)
  tasks: Task[];

  @Column({ type: 'text', default: () => 'current_timestamp' })
  created_at: string;

  @Column({ type: 'text', default: () => 'current_timestamp' })
  updated_at: string;

  constructor(props: CreateUserDto) {
    Object.assign(this, props);
  }

  static async create(props: CreateUserDto) {
    return new User({
      ...props,
      password: await bcrypt.hash(props.password, 10),
    });
  }
}
