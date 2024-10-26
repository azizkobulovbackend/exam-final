import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckHomeworkDto } from './create-check-homework.dto';

export class UpdateCheckHomeworkDto extends PartialType(CreateCheckHomeworkDto) {}
