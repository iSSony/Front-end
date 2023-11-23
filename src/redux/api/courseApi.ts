// Imports
import {
  genericErrorResponse,
  genericSuccessResponse,
} from "@/helpers/api/api-response";
import { TAG_TYPES } from "../tag-types";
import { baseApi } from "./baseApi";

// Constant for this api routes
const ENDPOINT_BASE_URL = "/courses";

const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    courses: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ENDPOINT_BASE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      providesTags: [TAG_TYPES.course],
    }),
    course: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ENDPOINT_BASE_URL}/${id}`,
        method: "GET",
      }),
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      providesTags: [TAG_TYPES.course],
    }),
    createCourse: build.mutation({
      query: (data) => ({
        url: ENDPOINT_BASE_URL,
        method: "POST",
        data,
      }),
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      invalidatesTags: [TAG_TYPES.course],
    }),
    updateCourse: build.mutation({
      query: (data) => ({
        url: `${ENDPOINT_BASE_URL}/${data.courseId}`,
        method: "PATCH",
        data: data.courseData,
      }),
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      invalidatesTags: [TAG_TYPES.course],
    }),
    removeCourse: build.mutation({
      query: (id: string | string[] | undefined) => ({
        url: `${ENDPOINT_BASE_URL}/${id}`,
        method: "DELETE",
      }),
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      invalidatesTags: [TAG_TYPES.course],
    }),
    userCourseRating: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ENDPOINT_BASE_URL}/rating/${id}`,
        method: "GET",
      }),
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      providesTags: [TAG_TYPES.course],
    }),
    addCourseRating: build.mutation({
      query: (data) => ({
        url: `${ENDPOINT_BASE_URL}/add-rating/${data.courseId}`,
        method: "PATCH",
        data: { rating: data.rating },
      }),
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      invalidatesTags: [TAG_TYPES.course],
    }),
  }),
});

export const {
  useCoursesQuery,
  useCourseQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useRemoveCourseMutation,
  useUserCourseRatingQuery,
  useAddCourseRatingMutation,
} = courseApi;
