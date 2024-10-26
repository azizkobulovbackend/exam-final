import { Course } from 'src/course/entities/course.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'enum', enum: ['odd', 'even'] })
  days: string;

  @Column({ type: 'enum', enum: ['Teacher', 'Assistant'] })
  role: string;

  @OneToMany(() => Course, (course) => course.teacher)
  @JoinColumn()
  courses: Course[];

  @CreateDateColumn()
  start_time: Date;

  @Column({ type: 'varchar' })
  photo: string;

  @DeleteDateColumn()
  end_time: Date;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}
