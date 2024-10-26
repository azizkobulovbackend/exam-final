import { CourseModule } from 'src/module/entities/module.entity';
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
export class Homework {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  description: string;

  @OneToOne(() => CourseModule, (module) => module.homework)
  @JoinColumn()
  module: CourseModule;

  @CreateDateColumn()
  start_time: Date;

  @DeleteDateColumn()
  end_time: Date;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}
