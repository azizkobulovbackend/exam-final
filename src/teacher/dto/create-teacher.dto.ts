import { IsNotEmpty, IsString, IsEnum, IsArray } from 'class-validator';

enum Days {
  even = 'even',
  odd = 'odd',
}

enum Role {
  Teacher = 'Teacher',
  Assistant = 'Assistant',
}

export class CreateTeacherDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(Days)
  days: Days;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  photo: any;
}
