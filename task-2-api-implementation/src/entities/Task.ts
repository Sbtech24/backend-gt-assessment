import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({
    type: "enum",
    enum: TaskPriority,
  })
  priority!: TaskPriority;

  @Column({
    type: "enum",
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status!: TaskStatus;

 
  @ManyToOne(() => User, (user) => user.assignedTasks, {
    nullable: true,
    onDelete: "SET NULL",
  })
  assignedTo!: User | null;

  
  @ManyToOne(() => User, (user) => user.createdTasks, {
    nullable: false,
    onDelete: "CASCADE",
  })
  assignedBy!: User;

  @CreateDateColumn()
  createdAt!: Date;
}