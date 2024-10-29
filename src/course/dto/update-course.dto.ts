import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateCourseDto } from './create-course.dto';

enum CourseCategory {
  Programming = 'Programming',
  SMM = 'SMM',
  Design = 'Design',
}

enum Level {
  first = '1',
  second = '2',
  third = '3',
}

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  category: CourseCategory;

  level: Level;
  
  @IsString()
  teacher_id: string;
}
