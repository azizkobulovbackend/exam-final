import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseModule } from './entities/module.entity';
import { Repository } from 'typeorm';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Course } from 'src/course/entities/course.entity';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(CourseModule)
    private readonly ModuleRepository: Repository<CourseModule>,
    @InjectRepository(Course)
    private readonly CourseRepository: Repository<Course>,
  ) {}

  async create(createModuleDto: CreateModuleDto) {
    const { name, course_id } = createModuleDto;
    const findCourse = await this.CourseRepository.findOne({
      where: { id: course_id },
    });

    if (!findCourse)
      return new HttpException('Teacher not found', HttpStatus.NOT_FOUND);

    const newModule = this.ModuleRepository.create({
      name,
      course: findCourse,
    });

    return await this.ModuleRepository.save(newModule);
  }

  async findAll(): Promise<CourseModule[] | any> {
    const modules = await this.ModuleRepository.createQueryBuilder('module')
    .leftJoinAndSelect('module.course', 'course')
    .leftJoinAndSelect('module.lessons', 'lessons')
    .leftJoinAndSelect('module.homework', 'homework') 
      .select([
        'module',
        'course.name',
        'course.description',
        'course.price',
        'course.category',
        'course.level',
        'course.teacher',
        'lessons',
        'homework'
      ])
      .getMany();
    return modules
  }

  async findOne(id: any): Promise<CourseModule | any> {
    const findModule = await this.ModuleRepository.findOne({
      where: { id },
      relations: ['course'],
    });
    if (!findModule)
      return new HttpException('Module not found', HttpStatus.NOT_FOUND);
    return findModule;
  }

  async update(id: any, updateModuleDto: UpdateModuleDto): Promise<any> {
    let findModule = await this.ModuleRepository.findOneBy({ id });
    if (!findModule)
      return new HttpException('Module not found', HttpStatus.NOT_FOUND);
    await this.ModuleRepository.update({ id }, { ...updateModuleDto });
    return 'Module Updated Successfully';
  }

  async remove(id: any) {
    let findModule = await this.ModuleRepository.findOneBy({ id });
    if (!findModule)
      return new HttpException('Module not found', HttpStatus.NOT_FOUND);
    return this.ModuleRepository.delete(id);
  }
}
