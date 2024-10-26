import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly TeacherRepository: Repository<Teacher>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto, file) {
    let { name, days, role } = createTeacherDto;
    let url = `http://localhost:3000/teacher/uploads/${file.filename}`;
    let newTeacher = await this.TeacherRepository.create({
      name,
      days,
      role,
      photo: url, 
    });
    await this.TeacherRepository.save(newTeacher);
  }

  findAll() {
    return this.TeacherRepository.find({relations: {courses: true}});
  }

  async findOne(id: any) {
    let findTeacher = await this.TeacherRepository.findOne({where: {id}, select: {courses: {name: true} }});

    if (!findTeacher)
      return new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
    return findTeacher;
  }

  async update(id: any, updateTeacherDto: UpdateTeacherDto) {
    let findTeacher = await this.TeacherRepository.findOneBy({ id });
    if (!findTeacher)
      return new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
    await this.TeacherRepository.update({ id }, { ...updateTeacherDto });
  }

  async remove(id: any) {
    let findTeacher = await this.TeacherRepository.findOneBy({ id });
    if (!findTeacher)
      return new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
    return this.TeacherRepository.delete(id);
  }
}
