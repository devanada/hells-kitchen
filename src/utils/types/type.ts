import { z } from "zod";

export const querySchema = z.object({
  page: z.string().optional().default("1"),
  overwrite: z.enum(["true", "false"]).optional().default("false"),
  query: z.string().optional().default(""),
  sort: z.string().optional().default(""),
  filter: z.string().optional().default(""),
  limit: z.string().optional().default("10"),
});

export type QuerySchema = z.infer<typeof querySchema>;

export const categories = [
  "Fiction",
  "Fantasy",
  "Mystery",
  "Romance",
  "Science",
  "History",
  "Business",
  "Children",
  "Thriller",
  "Biography",
  "Religion",
  "Cookbooks",
  "Horror",
  "Psychology",
] as const;
