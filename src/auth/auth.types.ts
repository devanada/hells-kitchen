import { querySchema } from "../utils/types/type";
import { z } from "zod";

export const bodyLogin = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Not a valid email"),
  password: z.string({
    required_error: "Password is required",
  }),
});

export const bodyRegister = z.object({
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
  role: z.enum(["user", "admin"], { required_error: "Role is required" }),
  address: z.string({
    required_error: "Address is required",
  }),
  phone_number: z.string({
    required_error: "Phone number is required",
  }),
});

export const loginSchema = z.object({
  body: bodyLogin,
});

export const registerSchema = z.object({
  query: querySchema,
  body: bodyRegister,
});

export type RegistSchema = z.infer<typeof bodyRegister>;
export type LoginSchema = z.infer<typeof bodyLogin>;
