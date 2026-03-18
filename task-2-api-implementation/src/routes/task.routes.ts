import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  createTaskController,
  getTasksController,
  updateTaskController,
  updateTaskStatusController,
  unassignTaskController,
  deleteTaskController,
} from "../controllers/task.controller";

const router = Router();

router.post("/", authMiddleware, createTaskController);
router.get("/", authMiddleware, getTasksController);
router.patch("/:id", authMiddleware, updateTaskController);
router.patch("/:id/status", authMiddleware, updateTaskStatusController);
router.patch("/:id/unassign", authMiddleware, unassignTaskController);
router.delete("/:id", authMiddleware, deleteTaskController);

export default router;