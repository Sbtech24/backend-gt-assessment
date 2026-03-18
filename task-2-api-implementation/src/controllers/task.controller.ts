import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createTask,
  getTasks,
  updateTask,
  updateTaskStatus,
  unassignTask,
  deleteTask,
} from "../services/task.services";
import { TaskPriority, TaskStatus } from "../entities/Task";

export const createTaskController = async (req: AuthRequest, res: Response) => {
  try {
    const { title, priority, assignedTo } = req.body;
    if (!title || !priority || !assignedTo) return res.status(400).json({ message: "Missing fields" });
    if (!Object.values(TaskPriority).includes(priority)) return res.status(400).json({ message: "Invalid priority" });

    const task = await createTask(title, priority, assignedTo, req.userId!);
    res.status(201).json(task);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getTasksController = async (req: AuthRequest, res: Response) => {
  try {
    const { assignedTo, status } = req.query;
    const tasks = await getTasks({
      assignedTo: assignedTo ? Number(assignedTo) : undefined,
      status: status as TaskStatus | undefined,
    });
    res.json(tasks);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateTaskController = async (req: AuthRequest, res: Response) => {
  try {
    const taskId = Number(req.params.id);
    const { title, priority } = req.body;
    if (priority && !Object.values(TaskPriority).includes(priority)) return res.status(400).json({ message: "Invalid priority" });

    const task = await updateTask(taskId, req.userId!, { title, priority });
    res.json(task);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateTaskStatusController = async (req: AuthRequest, res: Response) => {
  try {
    const taskId = Number(req.params.id);
    const { status } = req.body;
    if (!status || !Object.values(TaskStatus).includes(status)) return res.status(400).json({ message: "Invalid status" });

    const task = await updateTaskStatus(taskId, req.userId!, status);
    res.json(task);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const unassignTaskController = async (req: AuthRequest, res: Response) => {
  try {
    const taskId = Number(req.params.id);
    const task = await unassignTask(taskId, req.userId!);
    res.json(task);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTaskController = async (req: AuthRequest, res: Response) => {
  try {
    const taskId = Number(req.params.id);
    await deleteTask(taskId, req.userId!);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};