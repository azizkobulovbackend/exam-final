import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Teacher } from '../teacher/entities/teacher.entity';
import { User } from 'src/user/entities/user.entity';
import { CourseModule } from 'src/module/entities/module.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Course, User, CourseModule, Teacher])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModules {}
