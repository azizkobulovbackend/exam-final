import { Course } from 'src/course/entities/course.entity';
import { Homework } from 'src/homework/entities/homework.entity';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CourseModule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @OneToOne(() => Homework, (homework) => homework.module)
  homework: Homework;

  @OneToMany(() => Lesson, (lesson) => lesson.module)
  @JoinColumn()
  lessons: Lesson[];

  @ManyToOne(() => Course, (course) => course.modules)
  @JoinColumn()
  course: Course;

  @CreateDateColumn()
  start_time: Date;

  @DeleteDateColumn()
  end_time: Date;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}
