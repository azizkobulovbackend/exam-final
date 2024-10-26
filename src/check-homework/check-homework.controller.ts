import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CheckHomeworkService } from './check-homework.service';
import { CreateCheckHomeworkDto } from './dto/create-check-homework.dto';
import { UpdateCheckHomeworkDto } from './dto/update-check-homework.dto';

@Controller('check-homework')
export class CheckHomeworkController {
  constructor(private readonly checkHomeworkService: CheckHomeworkService) {}

  @Post()
  create(@Body() createCheckHomeworkDto: CreateCheckHomeworkDto) {
    return this.checkHomeworkService.create(createCheckHomeworkDto);
  }

  @Get()
  findAll() {
    return this.checkHomeworkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkHomeworkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckHomeworkDto: UpdateCheckHomeworkDto) {
    return this.checkHomeworkService.update(+id, updateCheckHomeworkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkHomeworkService.remove(+id);
  }
}
