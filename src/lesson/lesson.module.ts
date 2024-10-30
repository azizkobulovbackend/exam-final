import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from 'src/module/entities/module.entity';
import { Lesson } from './entities/lesson.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';


const uploadDir = join(process.cwd(), 'src/lesson/uploads');
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir);
}
@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson, CourseModule]),
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
        if (!file.mimetype.startsWith('video/')) {
         return cb(new Error('Please upload a valid video file'), false);
        } else {
          cb(null, true);
        }
      },
    }),
  ],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
