import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class CreateLessonDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  video: any

  @IsNotEmpty()
  module_id: string;
}
