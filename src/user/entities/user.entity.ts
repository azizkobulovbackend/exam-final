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
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  fullname: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  photo: string;

  @ManyToOne(() => Course, (course) => course.users)
  @JoinColumn()
  course: Course;

  @Column({ type: 'enum', enum: ['male', 'female', 'other'] })
  sex: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'boolean', default: false })
  is_admin: boolean;

  @CreateDateColumn()
  start_time: Date;

  @DeleteDateColumn()
  end_time: Date;
}
