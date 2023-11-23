// Imports
import * as z from "zod";

const course = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(4, "Name must have at least 8 characters"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  country: z.string({
    required_error: "Country is required",
  }),
  city: z.string({
    required_error: "City is required",
  }),
});

export const PaymentSchema = {
  course,
};
