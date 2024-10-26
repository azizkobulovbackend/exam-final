import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Course } from 'src/course/entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Course])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
