// Imports
import * as z from "zod";

const signUp = z.object({
  firstName: z
    .string({
      required_error: "First Name is required",
    })
    .min(4, "First Name must have at least 4 characters"),
  middleName: z.string().optional(),
  lastName: z
    .string({
      required_error: "Last Name is required",
    })
    .min(4, "Last Name must have at least 4 characters"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must have at least 6 characters"),
});

const login = z.object({
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(6, "Password must have at least 6 characters"),
});

const profileUpdate = z.object({
  firstName: z
    .string({
      required_error: "First Name is required",
    })
    .min(4, "First Name must have at least 4 characters"),
  middleName: z.string().optional(),
  lastName: z
    .string({
      required_error: "Last Name is required",
    })
    .min(4, "Last Name must have at least 4 characters"),
});

export const UserSchema = {
  signUp,
  login,
  profileUpdate,
};
