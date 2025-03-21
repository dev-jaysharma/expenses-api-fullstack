import { z } from "zod";

const expense = z.object({
  id: z.number().int().positive(),
  title: z.string().min(3).max(255),
  amount: z.number().positive().int(),
});

export { expense };
