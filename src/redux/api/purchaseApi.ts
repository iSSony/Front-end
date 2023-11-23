// Imports
import {
  genericErrorResponse,
  genericSuccessResponse,
} from "@/helpers/api/api-response";
import { TAG_TYPES } from "../tag-types";
import { baseApi } from "./baseApi";

// Constant for this api routes
const ENDPOINT_BASE_URL = "/purchases";

const purchaseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    myCourses: build.query({
      query: () => {
        return {
          url: `${ENDPOINT_BASE_URL}/my-courses`,
          method: "GET",
        };
      },
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      providesTags: [TAG_TYPES.purchase],
    }),
    isCoursePurchased: build.query({
      query: (id) => {
        return {
          url: `${ENDPOINT_BASE_URL}/status/${id}`,
          method: "GET",
        };
      },
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      providesTags: [TAG_TYPES.purchase],
    }),
    createPaymentIntent: build.mutation({
      query: () => ({
        url: `${ENDPOINT_BASE_URL}/create-payment-intent`,
        method: "POST",
      }),
      invalidatesTags: [TAG_TYPES.purchase],
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
    }),
    purchaseCourses: build.mutation({
      query: () => ({
        url: ENDPOINT_BASE_URL,
        method: "POST",
      }),
      invalidatesTags: [TAG_TYPES.purchase],
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
    }),
  }),
});

export const {
  useMyCoursesQuery,
  useIsCoursePurchasedQuery,
  useCreatePaymentIntentMutation,
  usePurchaseCoursesMutation,
} = purchaseApi;
