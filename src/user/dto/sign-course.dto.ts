import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsEmail,
} from 'class-validator';



export class SignCourseDto {
  @IsNotEmpty()
  @IsString()
  course_id: string;
}
