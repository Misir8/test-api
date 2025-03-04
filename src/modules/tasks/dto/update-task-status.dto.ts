import { IsEnum } from 'class-validator';
import { TaskStatus } from '../../../entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskStatusDto {
  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.PROGRESS,
    description: 'Статус задачи',
  })
  @IsEnum(TaskStatus, { message: 'Недопустимый статус задачи' })
  status: TaskStatus;
}
