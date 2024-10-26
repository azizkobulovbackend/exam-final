import { Injectable } from '@nestjs/common';
import { CreateCheckHomeworkDto } from './dto/create-check-homework.dto';
import { UpdateCheckHomeworkDto } from './dto/update-check-homework.dto';

@Injectable()
export class CheckHomeworkService {
  create(createCheckHomeworkDto: CreateCheckHomeworkDto) {
    return 'This action adds a new checkHomework';
  }

  findAll() {
    return `This action returns all checkHomework`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkHomework`;
  }

  update(id: number, updateCheckHomeworkDto: UpdateCheckHomeworkDto) {
    return `This action updates a #${id} checkHomework`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkHomework`;
  }
}
