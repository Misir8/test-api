import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LogService } from './log.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('log')
@ApiBearerAuth()
@Controller('log')
@UseGuards(AuthGuard())
export class LogController {
  constructor(private logService: LogService) {}

  @Get('total/:user_id')
  @ApiOperation({
    summary: 'Получить сумму очков задач пользователя по статусам',
  })
  @ApiParam({ name: 'user_id', description: 'ID пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Сумма очков по статусам',
    schema: {
      type: 'object',
      example: {
        created: 10,
        progress: 6,
        done: 8,
      },
    },
  })
  getTotalPoints(@Param('user_id') userId: number) {
    return this.logService.getTotalPointsByStatus(userId);
  }

  @Get('range/:user_id/:start_date/:end_date')
  @ApiOperation({
    summary: 'Получить сумму очков задач пользователя по статусам за период',
  })
  @ApiParam({ name: 'user_id', description: 'ID пользователя' })
  @ApiParam({ name: 'start_date', description: 'Начальная дата (YYYY-MM-DD)' })
  @ApiParam({ name: 'end_date', description: 'Конечная дата (YYYY-MM-DD)' })
  @ApiResponse({
    status: 200,
    description: 'Сумма очков по статусам за период',
    schema: {
      type: 'object',
      example: {
        created: 4,
        progress: 2,
        done: 6,
      },
    },
  })
  getPointsInRange(
    @Param('user_id') userId: number,
    @Param('start_date') startDate: string,
    @Param('end_date') endDate: string,
  ) {
    return this.logService.getPointsByStatusInRange(userId, startDate, endDate);
  }
}
