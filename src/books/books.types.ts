import { z } from "zod";

import { categories, querySchema } from "../utils/types/type";

export const bodyBook = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  feature: z.boolean().optional(),
  author: z.string({
    required_error: "Author is required",
  }),
  isbn: z.string({
    required_error: "ISBN is required",
  }),
  category: z.enum(categories, { required_error: "Category is required" }),
  description: z.string({
    required_error: "Description is required",
  }),
  cover_image: z.string().optional(),
});

export const bookRequest = z.object({
  query: querySchema,
});

export const booksSchema = z.object({
  query: querySchema,
  body: bodyBook,
});

export type BodyBookSchema = z.infer<typeof bodyBook>;
