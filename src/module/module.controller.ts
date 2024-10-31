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
import { ModuleService } from './module.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/admin/admin.guard';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService,) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.moduleService.create(createModuleDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.moduleService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduleService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Get(':id/module-results')
  findModuleResults(@Param('id') id: string) {
    return this.moduleService.findModuleResults(id);
  }

  @Patch(':id')
  update(@Param('id') id: any, @Body() updateModuleDto: UpdateModuleDto) {
    return this.moduleService.update(id, updateModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: any) {
    return this.moduleService.remove(id);
  }
}
