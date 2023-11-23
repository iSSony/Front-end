// Imports
import RootLayout from "@/components/Layouts/RootLayout";
import AuthLayout from "@/components/Layouts/AuthLayout";
import type { ReactElement } from "react";
import { Row, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCourseModulesQuery } from "@/redux/api/courseModuleApi";
import {
  useCourseProgressQuery,
  useUpdateCourseProgressMutation,
} from "@/redux/api/courseProgressApi";
import {
  IContentRouteData,
  ICourse,
  ICourseModule,
  IModuleContent,
  IUserCourseProgress,
  IUserCourseRating,
  ResponseSuccessType,
} from "@/types";
import swal from "sweetalert";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import ContentView from "@/components/ui/course/course-content/ContentView";
import ContentSidebar from "@/components/ui/course/course-content/ContentSidebar";
import {
  findNextContentRoute,
  findPreviousContentRoute,
  isUserProgressUpdateRequired,
} from "@/utils/course-content";
import CourseContentLayout from "@/components/Layouts/CourseContentLayout";
import { ENUM_USER_ROLES } from "@/enums/user";
import CourseModulePageSkeleton from "@/components/ui/course/course-content/skeletons/CourseModulePageSkeleton";
import {
  useAddCourseRatingMutation,
  useCourseQuery,
  useUserCourseRatingQuery,
} from "@/redux/api/courseApi";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import AdminFeaturesInformation from "@/components/ui/AdminFeaturesInformation";
import AOS from "aos";

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
  const [rating, setRating] = useState<number>(0.0);
  const [ratingCompleted, setRatingCompleted] = useState(false);
  const [userProgressUpdateRequired, setUserProgressUpdateRequired] =
    useState(false);

  // Update Course Progress Hook
  const [updateCourseProgress] = useUpdateCourseProgressMutation();

  // Add User Rating hook
  const [addRating] = useAddCourseRatingMutation();

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

  // User Course Rating
  const { data: ratingData, isLoading: ratingDataLoading } =
    useUserCourseRatingQuery(courseId);
  const userRating = ratingData?.data as IUserCourseRating;

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
          currentModule,
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
      if (courseProgress && currentModule && currentContent) {
        setUserProgressUpdateRequired(
          isUserProgressUpdateRequired(
            courseProgress,
            currentModule._id,
            currentContent._id
          )
        );
      }
    }
  }, [courseModulesData, courseProgressData]);

  const handleNextContentClick = async () => {
    // Route Pattern
    let routePattern = "";
    // Route actual URL
    let routeUrl = "";

    // Checking if user progress update is required
    if (userProgressUpdateRequired) {
      try {
        const res: ResponseSuccessType = await updateCourseProgress(
          courseId
        ).unwrap();
        if (res?.success) {
          if (nextContentRoute) {
            routePattern = `${nextContentRoute.initial}/${nextContentRoute.courseId}/[${nextContentRoute.moduleId}]/[${nextContentRoute.contentId}]`;
            routeUrl = `${nextContentRoute.initial}/${nextContentRoute.courseId}/${nextContentRoute.moduleId}/${nextContentRoute.contentId}`;
          } else {
            routePattern = `/course-content/${courseId}/[next-content]`;
            routeUrl = `/course-content/${courseId}/next-content`;
          }
          router.push(routePattern, routeUrl);
        }
      } catch (err: any) {
        swal(err?.message, "", "error");
      }
    } else {
      if (nextContentRoute) {
        routePattern = `${nextContentRoute.initial}/${nextContentRoute.courseId}/[${nextContentRoute.moduleId}]/[${nextContentRoute.contentId}]`;
        routeUrl = `${nextContentRoute.initial}/${nextContentRoute.courseId}/${nextContentRoute.moduleId}/${nextContentRoute.contentId}`;
      } else {
        routePattern = `/course-content/${courseId}/[next-content]`;
        routeUrl = `/course-content/${courseId}/next-content`;
      }
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

  const handleAddUserRating = async (value: number) => {
    setRating(value);
    try {
      const data = {
        courseId,
        rating: value,
      };
      const res: ResponseSuccessType = await addRating({
        ...data,
      }).unwrap();

      if (res?.success) {
        setRatingCompleted(true);
        swal(
          res?.message,
          "You can now see in course card the average rating has changed.",
          "success"
        );
      }
    } catch (err: any) {
      swal(err?.message, "", "error");
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 2500,
      once: false,
    });
    AOS.refresh();
  }, []);

  return (
    <div>
      {courseModulesDataLoading ||
      courseProgressDataLoading ||
      ratingDataLoading ||
      courseDataLoading ? (
        <CourseModulePageSkeleton />
      ) : (
        <div className="pb-5">
          <div className="text-start my-5">
            <Container>
              {courseProgress.completedContentCount >= 1 && (
                <div className="mb-1" data-aos="fade-right">
                  <AdminFeaturesInformation />
                </div>
              )}
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                <h3 className="fw-bold my-0">{course?.title}</h3>
                {userRating === null && !ratingCompleted && (
                  <div className="d-flex align-items-center">
                    <p className="m-0">Rate Course</p>
                    <Rating
                      className="fs-3 ms-2"
                      initialRating={rating}
                      fractions={2}
                      emptySymbol={
                        <FontAwesomeIcon icon={faStar} color="whitesmoke" />
                      }
                      fullSymbol={
                        <FontAwesomeIcon icon={faStar} color="gold" />
                      }
                      value={rating}
                      onChange={(value: number) => handleAddUserRating(value)}
                      readonly={rating !== 0}
                    ></Rating>
                  </div>
                )}
              </div>
              <Row>
                <ContentView
                  currentContent={currentContent as IModuleContent}
                  isPreviousButtonDisabled={
                    previousContentRoute === null ? true : false
                  }
                  handlePreviousContentClick={handlePreviousContentClick}
                  isNextButtonDisabled={false}
                  handleNextContentClick={handleNextContentClick}
                />
                <ContentSidebar
                  courseProgress={courseProgress}
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
    <AuthLayout onlyStudentAccess={true}>
      <RootLayout>
        <CourseContentLayout>{page}</CourseContentLayout>
      </RootLayout>
    </AuthLayout>
  );
};
