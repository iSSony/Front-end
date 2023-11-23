// Imports
import * as z from "zod";

const createAndUpdate = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  instructorName: z.string({
    required_error: "Instructor Name is required",
  }),
  price: z.string({
    required_error: "Price is required",
  }),
  thumbnailLink: z.string({
    required_error: "Thumbnail Link is required",
  }),
  introVideoLink: z.string({
    required_error: "Intro Video Link is required",
  }),
  lecturesCount: z.string({
    required_error: "Lectures count is required",
  }),
  projectsCount: z.string({
    required_error: "Project count is required",
  }),
});

export const CourseSchema = {
  createAndUpdate,
};
