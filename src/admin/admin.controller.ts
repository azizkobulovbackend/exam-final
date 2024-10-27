import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminGuard } from './admin.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createAdminDto: CreateAdminDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.adminService.create(createAdminDto, file);
  }

  @UseGuards(AdminGuard)
  @Get('me')
  getMyData(@Req() req: Request) {
    return this.adminService.getMyData(req['payload']);
  }
}
