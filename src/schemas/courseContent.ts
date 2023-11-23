// Imports
import * as z from "zod";

const createAndUpdate = z.object({
  title: z.string({
    required_error: "Content title is required",
  }),
  type: z.string({
    required_error: "Content type is required",
  }),
  link: z.string({
    required_error: "Content link is required",
  }),
  duration: z.string().optional(),
});

export const CourseContentSchema = {
  createAndUpdate,
};
