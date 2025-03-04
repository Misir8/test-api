import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from '../../entities/log.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  async getTotalPointsByStatus(
    userId: number,
  ): Promise<Record<string, number>> {
    const logs = await this.logRepository
      .createQueryBuilder('log')
      .select('log.logTaskStatus', 'status')
      .addSelect('SUM(log.points)', 'total')
      .where('log.userId = :userId', { userId })
      .groupBy('log.logTaskStatus')
      .getRawMany();

    return logs.reduce((acc, log) => {
      acc[log.status] = parseInt(log.total);
      return acc;
    }, {});
  }

  async getPointsByStatusInRange(
    userId: number,
    startDate: string,
    endDate: string,
  ): Promise<Record<string, number>> {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const logs = await this.logRepository
      .createQueryBuilder('log')
      .select('log.logTaskStatus', 'status')
      .addSelect('SUM(log.points)', 'total')
      .where('log.userId = :userId', { userId })
      .andWhere('log.timestamp >= :start', { start })
      .andWhere('log.timestamp <= :end', { end })
      .groupBy('log.logTaskStatus')
      .getRawMany();

    return logs.reduce((acc, log) => {
      acc[log.status] = parseInt(log.total);
      return acc;
    }, {});
  }
}
