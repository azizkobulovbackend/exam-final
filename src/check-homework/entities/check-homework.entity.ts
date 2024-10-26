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
export class CheckHomework {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  user_id: string;

  @Column({ type: 'varchar' })
  module_id: string;

  @Column({ type: 'varchar' })
  course_id: string;

  @CreateDateColumn()
  start_time: Date;

  @DeleteDateColumn()
  end_time: Date;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}
