// Imports
import * as z from "zod";

const createAndUpdate = z.object({
  moduleName: z.string({
    required_error: "Module Name is required",
  }),
});

export const CourseModelSchema = {
  createAndUpdate,
};
