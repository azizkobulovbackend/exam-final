import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from 'src/module/entities/module.entity';
import { Lesson } from './entities/lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, CourseModule])],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
