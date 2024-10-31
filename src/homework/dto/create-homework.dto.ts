import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class CreateHomeworkDto {
  @IsOptional()
  file: any;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  module_id: string;
}
