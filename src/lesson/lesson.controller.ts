import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/admin/admin.guard';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}


  @UseGuards(AdminGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createLessonDto: CreateLessonDto, @UploadedFile() file: Express.Multer.File) {
    return this.lessonService.create(createLessonDto, file);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.lessonService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':moduleId/lessons')
  findOne(@Param('id') id: any) {
    return this.lessonService.findLessonsOfModule(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: any, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonService.update(id, updateLessonDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: any) {
    return this.lessonService.remove(id);
  }
}
