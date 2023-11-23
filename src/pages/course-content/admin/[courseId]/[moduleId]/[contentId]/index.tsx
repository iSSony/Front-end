// Imports
import RootLayout from "@/components/Layouts/RootLayout";
import AuthLayout from "@/components/Layouts/AuthLayout";
import type { ReactElement } from "react";
import { Row, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCourseModulesQuery } from "@/redux/api/courseModuleApi";
import {
  IContentRouteData,
  ICourse,
  ICourseModule,
  IModuleContent,
} from "@/types";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import ContentView from "@/components/ui/course/course-content/ContentView";
import {
  findNextContentRoute,
  findPreviousContentRoute,
} from "@/utils/course-content";
import CourseContentLayout from "@/components/Layouts/CourseContentLayout";
import { ENUM_USER_ROLES } from "@/enums/user";
import CourseModulePageSkeleton from "@/components/ui/course/course-content/skeletons/CourseModulePageSkeleton";
import AdminContentSidebar from "@/components/ui/course/course-content/admin/AdminContentSidebar";
import { useCourseQuery } from "@/redux/api/courseApi";

const CourseModulePage = () => {
  const router = useRouter();

  // Extracting courseId, moduleId and courseId
  const courseId = router?.query?.courseId;
  const moduleId = router?.query?.moduleId;
  const contentId = router?.query?.contentId;

  // Current User
  const { currentUser } = useAppSelector((state) => state.user);

  // States
  const [nextContentRoute, setNextContentRoute] =
    useState<IContentRouteData | null>(null);
  const [previousContentRoute, setPreviousContentRoute] =
    useState<IContentRouteData | null>(null);

  // Course Modules
  const { data: courseModulesData, isLoading: courseModulesDataLoading } =
    useCourseModulesQuery(courseId);
  const courseModules = courseModulesData?.data as ICourseModule[];

  // Course Data
  const { data: courseData, isLoading: courseDataLoading } =
    useCourseQuery(courseId);
  const course = courseData?.data as ICourse;

  // Current Module
  const currentModule = courseModules?.find(
    (module: ICourseModule) => module._id === moduleId
  );

  // Current Content
  const currentContent = currentModule?.moduleContents?.find(
    (content: IModuleContent) => content._id === contentId
  );

  useEffect(() => {
    if (courseId && currentModule && currentContent) {
      setNextContentRoute(
        findNextContentRoute(
          currentUser?.role as ENUM_USER_ROLES,
          courseModules,
          currentModule as ICourseModule,
          courseId as string,
          currentContent._id
        )
      );
      setPreviousContentRoute(
        findPreviousContentRoute(
          currentUser?.role as ENUM_USER_ROLES,
          courseModules,
          currentModule,
          courseId as string,
          currentContent._id
        )
      );
    }
  }, [courseModulesData]);

  const handleNextContentClick = async () => {
    if (nextContentRoute) {
      // Route Pattern
      const routePattern = `${nextContentRoute.initial}/${nextContentRoute.courseId}/[${nextContentRoute.moduleId}]/[${nextContentRoute.contentId}]`;
      // Route actual URL
      const routeUrl = `${nextContentRoute.initial}/${nextContentRoute.courseId}/${nextContentRoute.moduleId}/${nextContentRoute.contentId}`;

      router.push(routePattern, routeUrl);
    }
  };

  const handlePreviousContentClick = () => {
    if (previousContentRoute) {
      router.push(
        `${previousContentRoute.initial}/${previousContentRoute.courseId}/[${previousContentRoute.moduleId}]/[${previousContentRoute.contentId}]`,
        `${previousContentRoute.initial}/${previousContentRoute.courseId}/${previousContentRoute.moduleId}/${previousContentRoute.contentId}`
      );
    }
  };

  return (
    <div>
      {courseModulesDataLoading || courseDataLoading ? (
        <CourseModulePageSkeleton />
      ) : (
        <div className="pb-5">
          <div className="text-start my-5">
            <Container>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
                <h3 className="fw-bold my-0">{course?.title}</h3>
              </div>
              <Row>
                <ContentView
                  currentContent={currentContent as IModuleContent}
                  isPreviousButtonDisabled={
                    previousContentRoute === null ? true : false
                  }
                  handlePreviousContentClick={handlePreviousContentClick}
                  isNextButtonDisabled={
                    nextContentRoute === null ? true : false
                  }
                  handleNextContentClick={handleNextContentClick}
                />
                <AdminContentSidebar
                  modules={courseModules}
                  courseId={courseId as string}
                  defaultActiveKey={currentModule?._id as string}
                />
              </Row>
            </Container>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseModulePage;

CourseModulePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout onlyAdminAccess={true}>
      <RootLayout>
        <CourseContentLayout>{page}</CourseContentLayout>
      </RootLayout>
    </AuthLayout>
  );
};
