import { Module } from '@nestjs/common';
import { CheckHomeworkService } from './check-homework.service';
import { CheckHomeworkController } from './check-homework.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { CourseModule } from 'src/module/entities/module.entity';
import { Homework } from 'src/homework/entities/homework.entity';
import { Result } from './entities/result';
import { Course } from 'src/course/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Result, User, Course, CourseModule, Homework])],
  controllers: [CheckHomeworkController],
  providers: [CheckHomeworkService],
})
export class CheckHomeworkModule {}
