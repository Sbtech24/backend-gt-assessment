import { AppDataSource } from "./config/data-source";
import { User } from "./entities/User";
import { Task, TaskPriority, TaskStatus } from "./entities/Task";

const seed = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected for seeding...");

    const userRepo = AppDataSource.getRepository(User);
    const taskRepo = AppDataSource.getRepository(Task);

    // Remove tasks first
    const allTasks = await taskRepo.find();
    if (allTasks.length > 0) await taskRepo.remove(allTasks);

    // Remove users next
    const allUsers = await userRepo.find();
    if (allUsers.length > 0) await userRepo.remove(allUsers);

    // Create users
    const users = userRepo.create([{}, {}, {}]);
    await userRepo.save(users);
    console.log("Users created:", users.map(u => u.id));

    // Create tasks
    const tasks = taskRepo.create([
      {
        title: "Finish backend assessment",
        priority: TaskPriority.HIGH,
        status: TaskStatus.PENDING,
        assignedBy: users[0],
        assignedTo: users[1],
      },
      {
        title: "Write documentation",
        priority: TaskPriority.MEDIUM,
        status: TaskStatus.IN_PROGRESS,
        assignedBy: users[1],
        assignedTo: users[2],
      },
      {
        title: "Deploy project",
        priority: TaskPriority.LOW,
        status: TaskStatus.PENDING,
        assignedBy: users[0],
        assignedTo: users[2],
      },
    ]);

    await taskRepo.save(tasks);
    console.log("Tasks created:", tasks.map(t => `${t.id}: ${t.title}`));

    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seed();