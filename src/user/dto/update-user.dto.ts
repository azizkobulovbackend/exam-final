import { PartialType } from '@nestjs/mapped-types';
import { SignCourseDto } from './sign-course.dto';

export class UpdateUserDto extends PartialType(SignCourseDto) {}
