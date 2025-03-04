import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../../entities/user.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post('tasks')
  @ApiOperation({ summary: 'Создать новую задачу' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'Задача успешно создана' })
  createTask(
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ) {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Get('users/:id/tasks')
  @ApiOperation({ summary: 'Получить все задачи пользователя' })
  @ApiParam({ name: 'id', description: 'ID пользователя' })
  @ApiResponse({ status: 200, description: 'Список задач пользователя' })
  getUserTasks(@Param('id') userId: number) {
    return this.tasksService.getUserTasks(userId);
  }

  @Patch('tasks/:id')
  @ApiOperation({ summary: 'Обновить статус задачи' })
  @ApiParam({ name: 'id', description: 'ID задачи' })
  @ApiBody({ type: UpdateTaskStatusDto })
  @ApiResponse({ status: 200, description: 'Статус задачи успешно обновлен' })
  @ApiResponse({ status: 404, description: 'Задача не найдена' })
  @ApiResponse({
    status: 401,
    description: 'Нет прав на изменение этой задачи',
  })
  updateTaskStatus(
    @Param('id') taskId: number,
    @Body(ValidationPipe) updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ) {
    return this.tasksService.updateTaskStatus(
      taskId,
      updateTaskStatusDto.status,
      user,
    );
  }

  @Delete('tasks/:id')
  @ApiOperation({ summary: 'Удалить задачу' })
  @ApiParam({ name: 'id', description: 'ID задачи' })
  @ApiResponse({ status: 200, description: 'Задача успешно удалена' })
  @ApiResponse({ status: 404, description: 'Задача не найдена' })
  @ApiResponse({ status: 401, description: 'Нет прав на удаление этой задачи' })
  deleteTask(@Param('id') taskId: number, @GetUser() user: User) {
    return this.tasksService.deleteTask(taskId, user);
  }
}
