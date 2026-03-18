import { Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Task } from "./Task";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  
  @OneToMany(() => Task, (task) => task.assignedBy)
  createdTasks!: Task[];

  
  @OneToMany(() => Task, (task) => task.assignedTo)
  assignedTasks!: Task[];
}