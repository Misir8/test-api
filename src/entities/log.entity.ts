import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Task } from './task.entity';
import { TaskStatus } from './task.entity';

// Определяем enum и экспортируем его
export enum LogTaskStatus {
  CREATED = 'created',
  PROGRESS = 'progress',
  HOLD = 'hold',
  DONE = 'done',
}

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  taskId: number;

  @Column()
  points: number;

  @Column({
    type: 'enum',
    enum: LogTaskStatus,
    enumName: 'log_task_status_enum',
  })
  logTaskStatus: LogTaskStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(() => User, (user) => user.logs)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Task, (task) => task.logs)
  @JoinColumn({ name: 'taskId' })
  task: Task;
}
