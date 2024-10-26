import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  category: CourseCategory;

  @IsNotEmpty()
  level: Level;

  @IsNotEmpty()
  teacher_id: string;
}
