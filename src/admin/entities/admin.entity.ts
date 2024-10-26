
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  fullname: string;

  @Column({ type: 'varchar', unique: true })
  phone: string;

  @Column({ type: 'varchar', unique: true })
  login: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  photo: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'boolean', default: true })
  is_admin: boolean;

  @CreateDateColumn()
  start_time: Date;

  @DeleteDateColumn()
  end_time: Date;
}
