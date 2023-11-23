export const getBaseUrl = (): string => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:8080/api/v1";
  } else {
    return process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8080/api/v1";
  }
};
