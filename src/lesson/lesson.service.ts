import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { CourseModule } from 'src/module/entities/module.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(CourseModule)
    private readonly moduleRepository: Repository<CourseModule>,
  ) {}

  async create(createLessonDto: CreateLessonDto, file: any) {
    const { name, module_id } = createLessonDto;

    const findModule = await this.moduleRepository.findOne({
      where: { id: module_id },
    });

    if (!findModule)
      return new HttpException('Module not found', HttpStatus.NOT_FOUND);

    const url = `http://localhost:3000/lesson/uploads/${file.filename}`;
    const newLesson = await this.lessonRepository.create({
      name,
      video: url,
      module: findModule,
    });

    return await this.lessonRepository.save(newLesson);
  }

  async findAll() {
    const lessons = await this.lessonRepository
      .createQueryBuilder('lesson')
      .leftJoinAndSelect('lesson.module', 'module')
      .select(['lesson', 'module.name'])
      .getMany();
    return lessons;
  }

  async findLessonsOfModule(id: any) {
    let findModule = await this.moduleRepository.findOne({
      where: { id },
      relations: ['lessons'],
    });
    if (!findModule) {
      return new HttpException('Lesson not found', HttpStatus.NOT_FOUND);
    }
    const lessons = findModule.lessons;
    return lessons;
  }

  async update(id: any, updateLessonDto: UpdateLessonDto) {
    let findLesson = await this.lessonRepository.findOneBy({ id });
    if (!findLesson)
      return new HttpException('Lesson not found', HttpStatus.NOT_FOUND);
    await this.lessonRepository.update({ id }, { ...updateLessonDto });
    return 'Lesson Updated Successfully';
  }

  async remove(id: any) {
    let findLesson = await this.lessonRepository.findOneBy({ id });
    if (!findLesson)
      return new HttpException('Lesson not found', HttpStatus.NOT_FOUND);
    return this.lessonRepository.delete(id);
  }
}
