import { Entity, PrimaryGeneratedColumn, Column, VersionColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
  
};