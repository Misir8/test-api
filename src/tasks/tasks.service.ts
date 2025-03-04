import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from '../entities/task.entity';
import { Log, LogTaskStatus } from '../entities/log.entity';
import { User } from '../entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.taskRepository.create({
      title,
      description,
      userId: user.id,
      status: TaskStatus.CREATED,
    });

    await this.taskRepository.save(task);

    // Логирование создания задачи
    const log = this.logRepository.create({
      userId: user.id,
      taskId: task.id,
      points: 2,
      logTaskStatus: LogTaskStatus.CREATED,
    });

    await this.logRepository.save(log);

    return task;
  }

  async getUserTasks(userId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async updateTaskStatus(
    taskId: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException(`Задача с ID "${taskId}" не найдена`);
    }

    if (task.userId !== user.id) {
      throw new UnauthorizedException(
        'Вы не имеете прав на изменение этой задачи',
      );
    }

    // Если статус не изменился, просто возвращаем задачу
    if (task.status === status) {
      return task;
    }

    task.status = status;
    await this.taskRepository.save(task);

    // Преобразуем TaskStatus в LogTaskStatus
    let logStatus: LogTaskStatus;
    switch (status) {
      case TaskStatus.CREATED:
        logStatus = LogTaskStatus.CREATED;
        break;
      case TaskStatus.PROGRESS:
        logStatus = LogTaskStatus.PROGRESS;
        break;
      case TaskStatus.HOLD:
        logStatus = LogTaskStatus.HOLD;
        break;
      case TaskStatus.DONE:
        logStatus = LogTaskStatus.DONE;
        break;
    }

    // Логирование изменения статуса
    const log = this.logRepository.create({
      userId: user.id,
      taskId: task.id,
      points: 2,
      logTaskStatus: logStatus,
    });

    await this.logRepository.save(log);

    return task;
  }

  async deleteTask(taskId: number, user: User): Promise<void> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException(`Задача с ID "${taskId}" не найдена`);
    }

    if (task.userId !== user.id) {
      throw new UnauthorizedException(
        'Вы не имеете прав на удаление этой задачи',
      );
    }

    await this.taskRepository.remove(task);
  }
}
