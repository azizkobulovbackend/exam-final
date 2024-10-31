import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeworkDto } from './create-homework.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateHomeworkDto extends PartialType(CreateHomeworkDto) {
  @IsString()
  description: string;

  @IsString()
  module_id: string;
}
