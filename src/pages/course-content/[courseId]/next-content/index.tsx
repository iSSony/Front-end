// Imports
import RootLayout from "@/components/Layouts/RootLayout";
import AuthLayout from "@/components/Layouts/AuthLayout";
import type { ReactElement } from "react";
import { Row, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import { useCourseModulesQuery } from "@/redux/api/courseModuleApi";
import { useCourseProgressQuery } from "@/redux/api/courseProgressApi";
import { ICourse, ICourseModule, IUserCourseProgress } from "@/types";
import ContentSidebar from "@/components/ui/course/course-content/ContentSidebar";
import CourseModulePageSkeleton from "@/components/ui/course/course-content/skeletons/CourseModulePageSkeleton";
import { useCourseQuery } from "@/redux/api/courseApi";
import ContentCookingView from "@/components/ui/course/course-content/ContentCookingView";

const CourseModulePage = () => {
  const router = useRouter();

  // Extracting courseId, moduleId and courseId
  const courseId = router?.query?.courseId;

  // User Course Progress Data
  const { data: courseProgressData, isLoading: courseProgressDataLoading } =
    useCourseProgressQuery(courseId);
  const courseProgress = courseProgressData?.data as IUserCourseProgress;

  // Course Modules
  const { data: courseModulesData, isLoading: courseModulesDataLoading } =
    useCourseModulesQuery(courseId);
  const courseModules = courseModulesData?.data as ICourseModule[];

  // Course Data
  const { data: courseData, isLoading: courseDataLoading } =
    useCourseQuery(courseId);
  const course = courseData?.data as ICourse;

  // Taking the user to home page if user progress is not 100%
  if (courseProgress && courseProgress.percentage !== 100) {
    router.push("/");
  }

  return (
    <div>
      {courseModulesDataLoading ||
      courseProgressDataLoading ||
      courseDataLoading ? (
        <CourseModulePageSkeleton />
      ) : (
        <div className="pb-5">
          <div className="text-start my-5">
            <Container>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                <h3 className="fw-bold my-0">{course?.title}</h3>
              </div>
              <Row>
                <ContentCookingView />
                <ContentSidebar
                  courseProgress={courseProgress}
                  modules={courseModules}
                  courseId={courseId as string}
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
    <AuthLayout onlyStudentAccess={true}>
      <RootLayout>{page}</RootLayout>
    </AuthLayout>
  );
};
