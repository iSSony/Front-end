// Imports
import { IGenericErrorResponse, ResponseSuccessType } from "@/types";

export const genericSuccessResponse = (response: any) => {
  const responseObject: ResponseSuccessType = {
    statusCode: response?.statusCode,
    success: response?.success,
    message: response?.message,
    data: response?.data,
    meta: response?.meta,
  };
  return responseObject;
};

export const genericErrorResponse = (error: any) => {
  const errorResponse: IGenericErrorResponse = {
    statusCode: error?.status || 500,
    success: false,
    message: error?.data?.message || "Something went wrong",
    errorMessages: error?.data?.errorMessages,
  };
  return errorResponse;
};
