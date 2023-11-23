// Imports
import {
  genericErrorResponse,
  genericSuccessResponse,
} from "@/helpers/api/api-response";
import { TAG_TYPES } from "../tag-types";
import { baseApi } from "./baseApi";

// Constant for this api routes
const ENDPOINT_BASE_URL = "/profile";

const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userProfile: build.query({
      query: () => {
        return {
          url: ENDPOINT_BASE_URL,
          method: "GET",
        };
      },
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      providesTags: [TAG_TYPES.user],
    }),
    updateUserProfile: build.mutation({
      query: (data) => ({
        url: ENDPOINT_BASE_URL,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [TAG_TYPES.user],
    }),
  }),
});

export const { useUserProfileQuery, useUpdateUserProfileMutation } = profileApi;
