import { z } from "zod";

export const userSchema = z.object({
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

export type UserUpdateSchema = z.infer<typeof userSchema>;
