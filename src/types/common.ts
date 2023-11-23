import { ENUM_USER_ROLES } from "@/enums/user";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export type ResponseSuccessType = {
  statusCode: number;
  success: boolean;
  message: string;
  data: any;
  meta?: IMeta;
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IGenericErrorResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IUserDecodedTokenData = {
  id: string;
  role: string;
  iat: number;
  exp: number;
};

export type ICourse = {
  _id: string;
  title: string;
  description: string;
  instructorName: string;
  totalRating: number;
  ratingCount: number;
  avgRating: number;
  price: number;
  thumbnailLink: string;
  introVideoLink: string;
  lecturesCount: number;
  projectsCount: number;
  studentsCount: number;
};

export type ICart = {
  _id: string;
  user: string;
  courses: string[];
  payment: {
    subTotal: number;
    tax: number;
    grandTotal: number;
  };
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type IUser = {
  _id: string;
  role: ENUM_USER_ROLES;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
  passwordChangedAt: string;
  __v?: number;
};

export type IModuleContent = {
  _id: string;
  title: string;
  type: "video" | "quiz";
  link: string;
  duration?: number;
};

export type ICourseModule = {
  _id: string;
  courseId: string;
  moduleNumber: number;
  moduleName: string;
  moduleContents: IModuleContent[];
};

export type IUserCourseProgress = {
  _id: string;
  user: string;
  courseId: string;
  completed: {
    moduleId: string;
    moduleNumber: number;
    contentId: string;
  }[];
  current: {
    moduleId: string;
    moduleNumber: number;
    contentId: string;
  };
  completedContentCount: number;
  percentage: number;
};

export type IContentRouteData = {
  initial: string;
  courseId: string;
  moduleId: string;
  contentId: string;
};

export type IUserCourseRating = {
  _id: string;
  courseId: string;
  user: string;
  rating: number;
};
