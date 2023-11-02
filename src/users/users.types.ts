import { querySchema } from "../utils/types/type";
import { z } from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const userUpdateBody = z.object({
  full_name: z.string({
    required_error: "Full name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Not a valid email"),
  password: z.string({
    required_error: "Password is required",
  }),
  address: z.string({
    required_error: "Address is required",
  }),
  phone_number: z.string({
    required_error: "Phone number is required",
  }),
  profile_picture: z.string().optional(),
});

export const userUpdateSchema = z.object({
  query: querySchema,
  body: userUpdateBody,
});

export const userDeleteSchema = z.object({
  query: querySchema,
});

export type UserUpdateSchema = z.infer<typeof userUpdateBody>;
