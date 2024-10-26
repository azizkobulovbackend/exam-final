import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
  Request,
  Res,
  Response,
} from '@nestjs/common';
import { createClient } from 'redis';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly CourseRepository: Repository<Course>,
    @InjectRepository(Teacher)
    private readonly TeacherRepository: Repository<Teacher>,
  ) {
  }

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course | any> {
    let { name, category, teacher_id } = createCourseDto;
    let findTeacher = await this.TeacherRepository.findOne({
      where: { id: teacher_id },
    });
    if (!findTeacher)
      return new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
    const newCourse = await this.CourseRepository.create({name, category, teacher: findTeacher});
    return this.CourseRepository.save(newCourse);
  }

  async findAll(): Promise<Course[] | any> {
    let courses = await this.CourseRepository.find({relations: {teacher: true}});

  }

  async findOne(id: any): Promise<Course | any> {
    let findCourse = await this.CourseRepository.findOneBy({ id });
    if (!findCourse)
      return new HttpException('Course not found', HttpStatus.NOT_FOUND);
  }

  async update(id: any, updateCourseDto: UpdateCourseDto): Promise<any> {
    let findCourse = await this.CourseRepository.findOneBy({ id });
    if (!findCourse)
      return new HttpException('Course not found', HttpStatus.NOT_FOUND);
    await this.CourseRepository.update({ id }, { ...updateCourseDto });
  }

  async remove(id: any) {
    let findCourse = await this.CourseRepository.findOneBy({ id });
    if (!findCourse)
      return new HttpException('Course not found', HttpStatus.NOT_FOUND);
    return this.CourseRepository.delete(id);
  }
}
