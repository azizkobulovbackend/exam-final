import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignCourseDto } from './dto/sign-course.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from 'src/course/entities/course.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}
  
  async create(signCourseDto: SignCourseDto, payload: any) {
    const { course_id } = signCourseDto;
    let user = await this.userRepository.findOneBy({ id: payload.id });
    let course = await this.courseRepository.findOneBy({
      id: course_id,
    });
    if (!course)
      return new HttpException('Course not found', HttpStatus.NOT_FOUND);

    if (user.course) {
      return new HttpException(
        'You have already signed up for a course',
        HttpStatus.NOT_FOUND,
      );
    } else {
      await this.userRepository.update({ id: payload.id }, { course });
    }
    return 'You have successfully signed up for a course';
  }
}
