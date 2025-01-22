import { Router, Request, Response } from "express";
import prisma from "../prisma";
import { createTaskSchema, updateTaskSchema, validateSchema } from "../middlewares";

const router = Router();

/**
 * GET /tasks
 * Fetch all tasks from the database.
 * The tasks are ordered by their creation date in descending order (newest first).
 * Returns a JSON array of tasks or an error message if the operation fails.
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
});

/**
 * GET /tasks/:id
 * Fetch a single task by its ID.
 * The ID is passed as a URL parameter.
 * Returns the task as a JSON object if found, or a 404 error if the task does not exist.
 */
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!task) {
      res.status(404).json({ error: "Task not found." });
      return;
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch task." });
  }
});

/**
 * POST /tasks
 * Create a new task with a title and a color.
 * Expects a JSON body with "title" and "color" fields.
 * Returns the newly created task as a JSON object or an error message if the operation fails.
 * Responds with a 400 status code if the required fields are missing.
 */
router.post("/", validateSchema(createTaskSchema),async (req: Request, res: Response): Promise<void> => {
  const { title, color } = req.body;
  if (!title || !color) {
    res.status(400).json({ error: "Title and color are required." });
    return;
  }

  try {
    const newTask = await prisma.task.create({
      data: { title, color },
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task." });
  }
});

/**
 * PUT /tasks/:id
 * Update an existing task by its ID.
 * Expects a JSON body with any of the fields "title", "color", or "completed".
 * Returns the updated task as a JSON object or an error message if the operation fails.
 * Responds with a 500 status code if the update fails.
 */
router.put("/:id", validateSchema(updateTaskSchema), async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, color, completed } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, color, completed },
    });
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task." });
  }
});

/**
 * DELETE /tasks/:id
 * Delete a task by its ID.
 * Does not return a response body but sends a 204 No Content status if successful.
 * Returns an error message if the operation fails.
 */
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task." });
  }
});

export default router;