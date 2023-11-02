import { z } from "zod";

export const querySchema = z.object({
  page: z.number().optional().default(1),
  overwrite: z.enum(["true", "false"]).optional().default("false"),
  query: z.string().optional().default(""),
  sort: z.string().optional().default(""),
  filter: z.string().optional().default(""),
});
