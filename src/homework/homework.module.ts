import { Module } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { HomeworkController } from './homework.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from 'src/module/entities/module.entity';
import { Homework } from './entities/homework.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Homework, CourseModule])],
  controllers: [HomeworkController],
  providers: [HomeworkService],
})
export class HomeworkModule {}
