import { z } from "zod";

export const borrowSchema = z.object({
  borrow_date: z
    .string({
      required_error: "Borrow date is required",
    })
    .datetime(),
  due_date: z
    .string({
      required_error: "Due date is required",
    })
    .datetime(),
  return_date: z.string().datetime().optional(),
});

export const borrowPayload = z.object({
  userId: z.number().optional(),
  bookId: z
    .number({
      required_error: "Book ID is required",
    })
    .array(),
  borrow_date: z
    .string({
      required_error: "Borrow date is required",
    })
    .datetime(),
  due_date: z.string().datetime().optional(),
  return_date: z.string().datetime().optional(),
});

export type BorrowSchema = z.infer<typeof borrowSchema>;
export type BorrowPayload = z.infer<typeof borrowPayload>;
