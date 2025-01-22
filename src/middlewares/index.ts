import { z } from "zod";
import { Request, Response } from "express";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title cannot be empty.")
    .max(50, "Title cannot exceed 50 characters."),
  color: z.string().min(1, "Color is required."),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, "Title cannot be empty.").max(50, "Title cannot exceed 50 characters.").optional(),
  color: z.string().optional(),
  completed: z.boolean().optional(),
});

// middleware for validating schemas
export const validateSchema = (schema: z.ZodTypeAny) => {
  return (req: Request, res: Response, next: Function) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const errors = result.error.format();
        res.status(400).json({ errors }); 
        return; 
      }
    req.body = result.data; 
    next();
  };
};