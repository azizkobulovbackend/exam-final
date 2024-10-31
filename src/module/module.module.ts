import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Homework } from 'src/homework/entities/homework.entity';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { Course } from 'src/course/entities/course.entity';
import { CourseModule } from './entities/module.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Result } from 'src/result/entities/result';

@Module({
  imports: [TypeOrmModule.forFeature([CourseModule, Homework, Teacher, Lesson, Course, Result])],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}
