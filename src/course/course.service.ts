import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
  Request,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { createClient } from 'redis';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly CourseRepository: Repository<Course>,
    @InjectRepository(Teacher)
    private readonly TeacherRepository: Repository<Teacher>,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course | any> {
    let { name, description, price, category, level, teacher_id } =
      createCourseDto;
    let findTeacher = await this.TeacherRepository.findOne({
      where: { id: teacher_id },
    });
    if (!findTeacher)
      return new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
    const newCourse = await this.CourseRepository.create({
      name,
      description,
      price,
      category,
      level,
      teacher: findTeacher,
    });
    return this.CourseRepository.save(newCourse);
  }

  async findAll(): Promise<Course[] | any> {
    let courses = await this.CourseRepository.createQueryBuilder('course')
      .leftJoinAndSelect('course.teacher', 'teacher')
      .leftJoinAndSelect('course.modules', 'modules')
      .select([
        'course',
        'teacher.name',
        'teacher.role',
        'teacher.photo',
        'teacher.days',
        'course',
        'modules.name'
      ])
      .getMany();
    return courses;
  }



  async findOne(id: any): Promise<Course | any> {
    let findCourse = await this.CourseRepository.findOne({where: {id}, relations: ['teacher']})
    if (!findCourse)
      return new HttpException('Course not found', HttpStatus.NOT_FOUND);
    return findCourse;
  }

  async update(id: any, updateCourseDto: UpdateCourseDto): Promise<any> {
    let findCourse = await this.CourseRepository.findOneBy({ id });
    if (!findCourse)
      return new HttpException('Course not found', HttpStatus.NOT_FOUND);
    await this.CourseRepository.update({ id }, { ...updateCourseDto });
    return 'Course Updated Successfully'
  }

  async remove(id: any) {
    let findCourse = await this.CourseRepository.findOneBy({ id });
    if (!findCourse)
      return new HttpException('Course not found', HttpStatus.NOT_FOUND);
    return this.CourseRepository.delete(id);
  }
}
