import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { hash, compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto, file): Promise<User | any> {
    const { fullname, email, password, sex } = createAuthDto;
    let findUserByEmail = await this.userRepository.findOneBy({ email });
    if (findUserByEmail) return 'User with this login or phone already exists';

    let hashedPass = await hash(password, 12);
    let url = `http://localhost:3000/user/uploads/${file.filename}`;
    let newUser = await this.userRepository.create({
      fullname,
      email,
      password: hashedPass,
      photo: url,
      sex,
    });
    await this.userRepository.save(newUser);
    let payload = {
      id: newUser.id,
      email: newUser.email,
      isAdmin: newUser.is_admin,
    };
    let token = await this.jwtService.sign(payload);
    let data = { newUser, token };
    return data;
  }

  async login(loginDto: LoginDto) {
    let { email, password } = loginDto;
    const user = await this.userRepository.findOneBy({ email});
    if (!user) throw new UnauthorizedException();
    let verify = await compare(password, user.password);
    if (!verify) throw new UnauthorizedException();
    let payload = { id: user.id, login: user.email, isAdmin: user.is_admin };
    let token = await this.jwtService.sign(payload);
    let data = { user, token };
    return data;
  }

  async getMyData(payload: any) {
    console.log(payload);

    const user = await this.userRepository.findOneBy({ id: payload.id });
    return user;
  }
}
