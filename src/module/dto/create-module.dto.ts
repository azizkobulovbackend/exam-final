
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateModuleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  course_id: string;
}
