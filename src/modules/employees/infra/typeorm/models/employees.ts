import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';

  
  @Entity('employees')
  class Employees {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name:string;
  
    @Column()
    age:string;
  
    
    @Column()
    occupation: string;

    @Column()
    taxpayerId: string;

  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
  }
  
  export default Employees;