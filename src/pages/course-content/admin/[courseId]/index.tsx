// Imports
import RootLayout from "@/components/Layouts/RootLayout";
import AuthLayout from "@/components/Layouts/AuthLayout";
import type { ReactElement } from "react";
import { Row, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import { useCourseModulesQuery } from "@/redux/api/courseModuleApi";
import { ICourse, ICourseModule } from "@/types";
import { useAppSelector } from "@/redux/hooks";
import { useCourseQuery } from "@/redux/api/courseApi";
import AdminCourseContentPageSkeleton from "@/components/ui/course/course-content/skeletons/AdminCourseContentPageSkeleton";
import AdminContentSidebar from "@/components/ui/course/course-content/admin/AdminContentSidebar";
import AdminCourseAnalytics from "@/components/ui/course/course-content/admin/AdminCourseAnalytics";

const CourseModulePage = () => {
  const router = useRouter();

  const courseId = router?.query?.courseId;

  // Getting course data
  const { data: courseData, isLoading: courseDataLoading } =
    useCourseQuery(courseId);
  const course = courseData?.data as ICourse;

  // Getting course modules
  const { data: courseModulesData, isLoading: courseModulesDataLoading } =
    useCourseModulesQuery(courseId);
  const courseModules = courseModulesData?.data as ICourseModule[];

  // Admin Course Data
  const studentsCount = course?.studentsCount;
  const modulesCount = courseModules?.length;

  // Calculating contentsCount
  let contentsCount = 0;
  courseModules?.forEach((module) => {
    contentsCount += module.moduleContents.length;
  });
  const avgRatingCount = course?.avgRating;

  return (
    <div>
      {courseDataLoading || courseModulesDataLoading ? (
        <AdminCourseContentPageSkeleton />
      ) : (
        <div>
          <div className="text-start my-5">
            <Container>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
                <h3 className="fw-bold my-0">{course?.title}</h3>
              </div>
              <Row>
                <AdminCourseAnalytics
                  studentsCount={studentsCount}
                  modulesCount={modulesCount}
                  contentsCount={contentsCount}
                  avgRatingCount={avgRatingCount}
                />
                <AdminContentSidebar
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
    <AuthLayout onlyAdminAccess={true}>
      <RootLayout>{page}</RootLayout>
    </AuthLayout>
  );
};
