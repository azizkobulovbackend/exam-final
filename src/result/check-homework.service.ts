import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCheckHomeworkDto } from './dto/create-check-homework.dto';
import { UpdateCheckHomeworkDto } from './dto/update-check-homework.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Homework } from 'src/homework/entities/homework.entity';
import { CourseModule } from 'src/module/entities/module.entity';
import { Result } from './entities/result';
import { Course } from 'src/course/entities/course.entity';
import { log } from 'console';

@Injectable()
export class CheckHomeworkService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Homework)
    private readonly homeworkRepository: Repository<Homework>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(CourseModule)
    private readonly moduleRepository: Repository<CourseModule>,
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
  ) {}

  async checkHomework(createCheckHomeworkDto: CreateCheckHomeworkDto) {
    const { user_id, homework_id, module_id, score } = createCheckHomeworkDto;
    const findUser = await this.userRepository.findOne({
      where: { course: { users: { id: user_id } } },
    });

    if (!findUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const findHomework = await this.homeworkRepository.findOne({
      where: { module: { id: module_id } },
    });

    if (!findHomework)
      throw new HttpException('Homework not found', HttpStatus.NOT_FOUND);

    const findModule = await this.moduleRepository.findOne({
      where: { id: module_id },
    });
    if (!findModule)
      throw new HttpException('Module not found', HttpStatus.NOT_FOUND);

    const userHomework = await this.resultRepository.findOne({
      where: { user_id, homework_id, module_id },
    });

    if (userHomework) {
      throw new HttpException('User score already exists', HttpStatus.CONFLICT);
    }

    const newResult = this.resultRepository.create({
      user_id: findUser.id,
      homework_id: findHomework.id,
      module_id: findModule.id,
      score,
    });
    return this.resultRepository.save(newResult);
  }

  async findAll() {
    const results = await this.resultRepository.find();
    return results;
  }

  async findMyResults(payload: any) {
    const myResults = await this.resultRepository.find({
      where: { user_id: payload.id },
    });
    return myResults;
  }

  async update(id: any, updateCheckHomeworkDto: UpdateCheckHomeworkDto) {
    const findResult = await this.resultRepository.findOne({ where: { id } });
    if(!findResult) throw new HttpException('Result not found', HttpStatus.NOT_FOUND);
    await this.resultRepository.update({ id }, { ...updateCheckHomeworkDto });
    return 'Result Updated Successfully';
  }

  remove(id: number) {
    return `This action removes a #${id} checkHomework`;
  }
}
