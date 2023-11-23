// Imports
import {
  genericErrorResponse,
  genericSuccessResponse,
} from "@/helpers/api/api-response";
import { TAG_TYPES } from "../tag-types";
import { baseApi } from "./baseApi";

// Constant for this api routes
const ENDPOINT_BASE_URL = "/cart";

const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    cart: build.query({
      query: () => {
        return {
          url: ENDPOINT_BASE_URL,
          method: "GET",
        };
      },
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      providesTags: [TAG_TYPES.cart],
    }),
    addToCart: build.mutation({
      query: (id) => ({
        url: `${ENDPOINT_BASE_URL}/add-to-cart/${id}`,
        method: "PATCH",
      }),
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      invalidatesTags: [TAG_TYPES.cart],
    }),
    removeFromCart: build.mutation({
      query: (id) => ({
        url: `${ENDPOINT_BASE_URL}/remove-from-cart/${id}`,
        method: "PATCH",
      }),
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      invalidatesTags: [TAG_TYPES.cart],
    }),
  }),
});

export const { useCartQuery, useAddToCartMutation, useRemoveFromCartMutation } =
  cartApi;
