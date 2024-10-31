import { Module } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { HomeworkController } from './homework.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from 'src/module/entities/module.entity';
import { Homework } from './entities/homework.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const uploadDir = join(process.cwd(), 'src/homework/uploads');
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir);
}
@Module({
  imports: [
    TypeOrmModule.forFeature([Homework, CourseModule]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const filename = `${Date.now()}${ext}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype === 'application/pdf' || // PDF
          file.mimetype === 'application/msword' || // Word (.doc)
          file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || // Word (.docx)
          file.mimetype === 'application/zip' || // ZIP
          file.mimetype === 'application/vnd.ms-excel' || // Excel (.xls)
          file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // Excel (.xlsx)
        ) {
          cb(null, true);
        } else {
          cb(new Error('Frong format...'), false);
        }
      },
    }),
  ],
  controllers: [HomeworkController],
  providers: [HomeworkService],
})
export class HomeworkModule {}
