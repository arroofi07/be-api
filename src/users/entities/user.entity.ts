import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  password: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  noHp: string;
}
