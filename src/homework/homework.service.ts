import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Homework } from './entities/homework.entity';
import { Repository } from 'typeorm';
import { CourseModule } from 'src/module/entities/module.entity';

@Injectable()
export class HomeworkService {
  constructor(
    @InjectRepository(Homework)
    private readonly homeworkRepository: Repository<Homework>,
    @InjectRepository(CourseModule)
    private readonly moduleRepository: Repository<CourseModule>,
  ) {}

  async create(createHomeworkDto: CreateHomeworkDto, file: any) {
    const { description, module_id } = createHomeworkDto;
    const findModule = await this.moduleRepository.findOne({
      where: { id: module_id },
    });
    if (!findModule)
      return new HttpException('Module not found', HttpStatus.NOT_FOUND);

    const url = `http://localhost:3000/homework/uploads/${file.filename}`;
    const newHomework = await this.homeworkRepository.create({
      file: url,
      description,
      module: findModule,
    });

    return this.homeworkRepository.save(newHomework);
  }

  async findAll() {
    const homeworks = await this.homeworkRepository
      .createQueryBuilder('homework')
      .leftJoinAndSelect('homework.module', 'module')
      .select(['homework', 'module'])
      .getMany();
    return homeworks;
  }

  async findOne(id: any) {
    const findHomework = this.homeworkRepository.findOne({ where: { id }, relations: ['module'] });
    if (!findHomework)
      return new HttpException('Homework not found', HttpStatus.NOT_FOUND);
    return findHomework
  }

  async update(id: any, updateHomeworkDto: UpdateHomeworkDto) {
    const findHomework = this.homeworkRepository.findOne({ where: { id } });
    if (!findHomework)
      return new HttpException('Homework not found', HttpStatus.NOT_FOUND);
    await this.homeworkRepository.update({ id }, { ...updateHomeworkDto });
  }

  async remove(id: any) {
    let findHomework = await this.homeworkRepository.findOneBy({ id });
    if (!findHomework)
      return new HttpException('Homework not found', HttpStatus.NOT_FOUND);
    return this.homeworkRepository.delete(id);
  }
}
