import { PartialType } from '@nestjs/mapped-types';
import { CreateModuleDto } from './create-module.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateModuleDto extends PartialType(CreateModuleDto) {
  @IsString()
  name: string;

  @IsString()
  course_id: string;
}
