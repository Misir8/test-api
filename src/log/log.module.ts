import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from '../entities/log.entity';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Log]), AuthModule],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
