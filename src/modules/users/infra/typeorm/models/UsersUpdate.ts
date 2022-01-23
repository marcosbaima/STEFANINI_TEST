import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';
@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  //@Exclude()
  password: string;

  @Column()
  avatar: string;

  @Column()
  IsActive: boolean;

  @Column()
  powerUser: boolean;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

 
  @Column('uuid')
  groupsId: string;
 
}

export default User;
