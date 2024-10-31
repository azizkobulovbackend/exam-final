import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CheckHomeworkService } from './check-homework.service';
import { CreateCheckHomeworkDto } from './dto/create-check-homework.dto';
import { UpdateCheckHomeworkDto } from './dto/update-check-homework.dto';
import { AdminGuard } from 'src/admin/admin.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('result')
export class CheckHomeworkController {
  constructor(private readonly checkHomeworkService: CheckHomeworkService) {}

  @UseGuards(AdminGuard)
  @Post('check-homework')
  create(@Body() createCheckHomeworkDto: CreateCheckHomeworkDto) {
    return this.checkHomeworkService.checkHomework(createCheckHomeworkDto);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAllResults() {
    return this.checkHomeworkService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('my-results')
  findOne(@Req() req: Request) {
    return this.checkHomeworkService.findMyResults(req['payload']);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: any, @Body() updateCheckHomeworkDto: UpdateCheckHomeworkDto) {
    return this.checkHomeworkService.update(id, updateCheckHomeworkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkHomeworkService.remove(+id);
  }
}
