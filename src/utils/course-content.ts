// Imports
import { IContentRouteData, ICourseModule, IUserCourseProgress } from "@/types";
import { ENUM_USER_ROLES } from "@/enums/user";

export const findNextContentRoute = (
  userRole: ENUM_USER_ROLES,
  allModules: ICourseModule[],
  currentModule: ICourseModule,
  courseId: string,
  contentId: string
) => {
  // Initalizing route
  let route: IContentRouteData | null = {
    initial:
      userRole === ENUM_USER_ROLES.STUDENT
        ? "/course-content"
        : "/course-content/admin",
    courseId: courseId,
    moduleId: "",
    contentId: "",
  };

  // Finding current content index
  const currentContentIndex = currentModule?.moduleContents.findIndex(
    (content) => content._id === contentId
  );

  // Move to next content in same module
  if (currentContentIndex != currentModule.moduleContents.length - 1) {
    // Next content
    const nextContent = currentModule.moduleContents[currentContentIndex + 1];
    route.moduleId = currentModule._id;
    route.contentId = nextContent._id;
  }
  // Move to next module first content
  else {
    // Next module
    const nextModule = allModules.find(
      (module) => module.moduleNumber === currentModule.moduleNumber + 1
    );

    if (nextModule && nextModule.moduleContents.length) {
      const nextContent = nextModule.moduleContents[0];
      route.moduleId = nextModule._id;
      route.contentId = nextContent._id;
    } else {
      route = null;
    }
  }
  return route;
};

export const findPreviousContentRoute = (
  userRole: ENUM_USER_ROLES,
  allModules: ICourseModule[],
  currentModule: ICourseModule,
  courseId: string,
  contentId: string
) => {
  let route: IContentRouteData | null = {
    initial:
      userRole === ENUM_USER_ROLES.STUDENT
        ? "/course-content"
        : "/course-content/admin",
    courseId: courseId,
    moduleId: "",
    contentId: "",
  };

  // Finding current content index
  const currentContentIndex = currentModule?.moduleContents.findIndex(
    (content) => content._id === contentId
  );

  // Move to previous content in same module
  if (currentContentIndex != 0) {
    // Previous content
    const previousContent =
      currentModule.moduleContents[currentContentIndex - 1];
    route.moduleId = currentModule._id;
    route.contentId = previousContent._id;
  }
  // Move to previous module last content
  else {
    // Previous module
    const previousModule = allModules.find(
      (module) => module.moduleNumber === currentModule.moduleNumber - 1
    );
    if (previousModule && previousModule.moduleContents.length) {
      const previousContent =
        previousModule.moduleContents[previousModule.moduleContents.length - 1];
      route.moduleId = previousModule._id;
      route.contentId = previousContent._id;
    } else {
      route = null;
    }
  }
  return route;
};

export const isUserProgressUpdateRequired = (
  progress: IUserCourseProgress,
  moduleId: string,
  contentId: string
) => {
  return (
    progress.current.moduleId === moduleId &&
    progress.current.contentId === contentId
  );
};
