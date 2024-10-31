import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { AdminGuard } from 'src/admin/admin.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { Admin } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('homework')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @UseGuards(AdminGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createHomeworkDto: CreateHomeworkDto, @UploadedFile() file: Express.Multer.File) {
    return this.homeworkService.create(createHomeworkDto, file);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.homeworkService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: any) {
    return this.homeworkService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: any,
    @Body() updateHomeworkDto: UpdateHomeworkDto,
  ) {
    return this.homeworkService.update(id, updateHomeworkDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: any) {
    return this.homeworkService.remove(id);
  }
}
