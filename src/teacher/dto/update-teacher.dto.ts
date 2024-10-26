import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CreateTeacherDto } from './create-teacher.dto';

enum Days {
  even = 'even',
  odd = 'odd',
}

enum Role {
  Teacher = 'Teacher',
  Assistant = 'Assistant',
}

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {
  @IsString()
  name: string;

  @IsEnum(Days)
  days: Days;

  @IsEnum(Role)
  role: Role;   

  photo: any;
}
