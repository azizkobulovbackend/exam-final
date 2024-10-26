import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async create(createAdminDto: CreateAdminDto, file: any) {
    let { fullname, phone, login, password } = createAdminDto;
    const checkAdmin = await this.adminRepository.findOneBy({ login });
    if (checkAdmin) return 'Admin with this login already exists';
    let hashedPass = await hash(password, 12);
    let url = `http://localhost:3000/user/uploads/${file.filename}`;
    let newAdmin = await this.adminRepository.create({
      fullname,
      phone,
      login,
      password: hashedPass,
      photo: url
    });
    await this.adminRepository.save(newAdmin);
    let payload = {
      id: newAdmin.id,
      login: newAdmin.login,
      isAdmin: newAdmin.is_admin,
    };
    let token = await this.jwtService.sign(payload);
    let data = { newAdmin, token };
    return data;
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
