import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCheckHomeworkDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  homework_id: string;

  @IsString()
  @IsNotEmpty()
  module_id: string;

  @IsNotEmpty()
  score: number;
}
