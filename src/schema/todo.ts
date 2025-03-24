import { z } from 'zod';

export const Task = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    quadrant: z.enum(['Q1', 'Q2', 'Q3', 'Q4']),
    completed: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string().nullable(),
    deletedAt: z.string().nullable(),
    explanation: z.string().nullable(),
});

export type Task = z.infer<typeof Task>;

export const TaskList = z.array(Task);

export type TaskList = z.infer<typeof TaskList>;