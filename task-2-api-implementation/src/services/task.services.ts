import { AppDataSource } from "../config/data-source";
import { Task, TaskPriority, TaskStatus } from "../entities/Task";
import { User } from "../entities/User";

const taskRepo = () => AppDataSource.getRepository(Task);
const userRepo = () => AppDataSource.getRepository(User);

export const createTask = async (
  title: string,
  priority: TaskPriority,
  assignedToId: number,
  assignedById: number
) => {
  const assignedTo = await userRepo().findOneBy({ id: assignedToId });
  const assignedBy = await userRepo().findOneBy({ id: assignedById });

  if (!assignedTo) throw new Error("Assignee not found");
  if (!assignedBy) throw new Error("Assigner not found");

  const task = taskRepo().create({
    title,
    priority,
    status: TaskStatus.PENDING,
    assignedTo,
    assignedBy,
  });

  return taskRepo().save(task);
};

export const getTasks = async (filters?: { assignedTo?: number; status?: TaskStatus }) => {
  const query = taskRepo().createQueryBuilder("task");

  if (filters?.assignedTo) query.andWhere("task.assignedToId = :assignedTo", { assignedTo: filters.assignedTo });
  if (filters?.status) query.andWhere("task.status = :status", { status: filters.status });

  return query.leftJoinAndSelect("task.assignedTo", "assignedTo")
              .leftJoinAndSelect("task.assignedBy", "assignedBy")
              .getMany();
};


export const ensureIsAssigner = (userId: number, task: Task) => {
  if (task.assignedBy.id !== userId) throw new Error("Forbidden: Not the assigner");
};


export const ensureIsAssignee = (userId: number, task: Task) => {
  if (!task.assignedTo || task.assignedTo.id !== userId)
    throw new Error("Forbidden: Not the assignee");
};

// UPDATE TASK DETAILS (assigner only)
export const updateTask = async (taskId: number, userId: number, updates: Partial<{ title: string; priority: TaskPriority }>) => {
  const task = await taskRepo().findOne({ where: { id: taskId }, relations: ["assignedBy", "assignedTo"] });
  if (!task) throw new Error("Task not found");
  ensureIsAssigner(userId, task);

  if (updates.title) task.title = updates.title;
  if (updates.priority) task.priority = updates.priority;

  return taskRepo().save(task);
};

// UPDATE TASK STATUS (assignee only)
export const updateTaskStatus = async (taskId: number, userId: number, status: TaskStatus) => {
  const task = await taskRepo().findOne({ where: { id: taskId }, relations: ["assignedBy", "assignedTo"] });
  if (!task) throw new Error("Task not found");
  ensureIsAssignee(userId, task);

  task.status = status;
  return taskRepo().save(task);
};

// UNASSIGN TASK (assigner only)
export const unassignTask = async (taskId: number, userId: number) => {
  const task = await taskRepo().findOne({ where: { id: taskId }, relations: ["assignedBy", "assignedTo"] });
  if (!task) throw new Error("Task not found");
  ensureIsAssigner(userId, task);
  task.assignedTo = null;
  return taskRepo().save(task);
};


export const deleteTask = async (taskId: number, userId: number) => {
  const task = await taskRepo().findOne({ where: { id: taskId }, relations: ["assignedBy", "assignedTo"] });
  if (!task) throw new Error("Task not found");
  ensureIsAssigner(userId, task);

  return taskRepo().remove(task);
};