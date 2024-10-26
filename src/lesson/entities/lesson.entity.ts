import { Module } from '@nestjs/common';
import {CourseModule} from 'src/module/entities/module.entity';
 
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
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToOne(() => CourseModule, (courseModule) => courseModule.lessons)
  @JoinColumn()
  module: CourseModule;
  
  @CreateDateColumn()
  start_time: Date;

  @DeleteDateColumn()
  end_time: Date;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}
