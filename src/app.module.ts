import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModules } from './course/course.module';
import { Course } from './course/entities/course.entity';
import { Teacher } from './teacher/entities/teacher.entity';
import { TeacherModule } from './teacher/teacher.module';
import { AdminModule } from './admin/admin.module';
import { User } from './user/entities/user.entity';
import { CourseModule } from './module/entities/module.entity';
import { UserModule } from './user/user.module';
import { Admin } from './admin/entities/admin.entity';
import { LessonModule } from './lesson/lesson.module';
import { HomeworkModule } from './homework/homework.module';
import { JwtModule } from '@nestjs/jwt';
import { Auth } from './auth/entities/auth.entity';
import { AuthModule } from './auth/auth.module';
import { ModuleModule } from './module/module.module';
import { Homework } from './homework/entities/homework.entity';
import { Lesson } from './lesson/entities/lesson.entity';
import { Result } from './result/entities/result';
import { CheckHomeworkModule } from './result/check-homework.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      password: '1234',
      username: 'postgres',
      entities: [Course, Teacher, User, Admin, Auth, CourseModule, Result, Homework, Lesson],
      database: 'course',
      synchronize: true,
      logging: true,
    }),
    JwtModule.register({
      global: true,
      secret: 'Very Secret',
      signOptions: { expiresIn: '1h' },
    }),
    AdminModule,
    CourseModules,
    TeacherModule,
    UserModule,
    LessonModule,
    HomeworkModule,
    CheckHomeworkModule,
    AuthModule,
    ModuleModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
