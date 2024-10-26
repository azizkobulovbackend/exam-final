import { Module } from '@nestjs/common';
import { CheckHomeworkService } from './check-homework.service';
import { CheckHomeworkController } from './check-homework.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckHomework } from './entities/check-homework.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckHomework])],
  controllers: [CheckHomeworkController],
  providers: [CheckHomeworkService],
})
export class CheckHomeworkModule {}
