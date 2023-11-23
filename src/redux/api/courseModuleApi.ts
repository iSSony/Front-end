// Imports
import {
  genericErrorResponse,
  genericSuccessResponse,
} from "@/helpers/api/api-response";
import { TAG_TYPES } from "../tag-types";
import { baseApi } from "./baseApi";

// Constant for this api routes
const ENDPOINT_BASE_URL = "/course-modules";

const courseModuleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createModule: build.mutation({
      query: (moduleData) => ({
        url: ENDPOINT_BASE_URL,
        method: "POST",
        data: moduleData,
      }),
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      invalidatesTags: [TAG_TYPES.courseModule],
    }),
    updateModule: build.mutation({
      query: (moduleData) => ({
        url: `${ENDPOINT_BASE_URL}/${moduleData.moduleId}`,
        method: "PATCH",
        data: moduleData,
      }),
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      invalidatesTags: [TAG_TYPES.courseModule],
    }),
    courseModules: build.query({
      query: (courseId: string | string[] | undefined) => ({
        url: `${ENDPOINT_BASE_URL}/${courseId}`,
        method: "GET",
      }),
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      providesTags: [TAG_TYPES.courseModule],
    }),
    addContentToModule: build.mutation({
      query: (payload) => ({
        url: `${ENDPOINT_BASE_URL}/add-content/${payload.moduleId}`,
        method: "PATCH",
        data: payload.contentData,
      }),
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      invalidatesTags: [TAG_TYPES.courseModule],
    }),
    updateContentInModule: build.mutation({
      query: (payload) => ({
        url: `${ENDPOINT_BASE_URL}/update-content/${payload.moduleId}/${payload.contentId}`,
        method: "PATCH",
        data: payload.contentData,
      }),
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      invalidatesTags: [TAG_TYPES.courseModule],
    }),
    removeContentFromModule: build.mutation({
      query: (payload) => ({
        url: `${ENDPOINT_BASE_URL}/remove-content/${payload.moduleId}/${payload.contentId}`,
        method: "DELETE",
      }),
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      invalidatesTags: [TAG_TYPES.courseModule],
    }),

    isCourseContentPublished: build.query({
      query: (courseId: string | string[] | undefined) => ({
        url: `${ENDPOINT_BASE_URL}/content-published/${courseId}`,
        method: "GET",
      }),
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      providesTags: [TAG_TYPES.courseModule],
    }),
    isCourseContentValid: build.query({
      query: (arg) => ({
        url: `${ENDPOINT_BASE_URL}/content-valid/${arg.courseId}/${arg.moduleId}/${arg.contentId}`,
        method: "GET",
      }),
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      providesTags: [TAG_TYPES.courseModule],
    }),
  }),
});

export const {
  useCreateModuleMutation,
  useUpdateModuleMutation,
  useCourseModulesQuery,
  useAddContentToModuleMutation,
  useUpdateContentInModuleMutation,
  useRemoveContentFromModuleMutation,
  useIsCourseContentPublishedQuery,
  useIsCourseContentValidQuery,
} = courseModuleApi;
