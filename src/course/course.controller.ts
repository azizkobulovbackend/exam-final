import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Response,
  Res,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/admin/admin.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('search') 
  search(@Query('q') query: string) {
    return this.courseService.search(query);
  }

  @UseGuards(AuthGuard)
  @Post('filter')
  filter(@Query('name') name?: any, @Query('category') category?: any, @Query('level') level?: any) {
    const filters = {name, category, level};
    return this.courseService.filter(filters)
  }


  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: any): any {
    return this.courseService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Get(':id/modules')
  findModules(@Param('id') id: any): any {
    return this.courseService.findModules(id);
  }

  @UseGuards(AuthGuard)
  @Get('id')

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: any, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: any) {
    return this.courseService.remove(id);
  }
}
