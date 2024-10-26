import { CourseModule } from 'src/module/entities/module.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { User } from 'src/user/entities/user.entity';
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
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'enum', enum: ['Programming', 'SMM', 'Design'] })
  category: string;

  @Column({ type: 'enum', enum: ['1', '2', '3'] })
  level: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.courses)
  @JoinColumn()
  teacher: Teacher;

  @OneToMany(() => User, (user) => user.course)
  @JoinColumn()
  users: User[];

  @OneToMany(() => CourseModule, (module) => module.course)
  @JoinColumn()
  modules: CourseModule[];


  @CreateDateColumn()
  start_time: Date;

  @DeleteDateColumn()
  end_time: Date;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}
