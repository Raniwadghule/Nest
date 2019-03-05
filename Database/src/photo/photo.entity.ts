import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employees')
export class Photo {
  @PrimaryGeneratedColumn() 
  EmpId: number;

  @Column({type : 'varchar', nullable:true })
  name: string;

  @Column({type : 'varchar', nullable:true }) 
  email: string;

  @Column({type : 'date', nullable:true }) 
  birthtate: Date;

  @Column({type : 'varchar', nullable:true })
   Image: string;

  @Column() isPublished: boolean;
}