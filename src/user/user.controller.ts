import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignCourseDto } from './dto/sign-course.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Post()
  userSignCourse(@Body() signCourseDto: SignCourseDto, @Req() req: Request) {
    return this.userService.create(signCourseDto, req['payload']);
  }
}
