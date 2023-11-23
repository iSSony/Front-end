// Imports
import { useIsCourseContentValidQuery } from "@/redux/api/courseModuleApi";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useIsCoursePurchasedQuery } from "@/redux/api/purchaseApi";
import { ENUM_USER_ROLES } from "@/enums/user";
import CourseModulePageSkeleton from "../ui/course/course-content/skeletons/CourseModulePageSkeleton";

const CourseContentLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  // Extracting courseId, moduleId and courseId
  const courseId = router?.query?.courseId;
  const moduleId = router?.query?.moduleId;
  const contentId = router?.query?.contentId;

  // Current user
  const { currentUser } = useAppSelector((state) => state.user);

  // Finding is content valid or not
  const { data: isValid, isLoading: isValidityLoading } =
    useIsCourseContentValidQuery({
      courseId,
      moduleId,
      contentId,
    });

  useEffect(() => {
    if (router && !isValidityLoading) {
      if (!isValid || (isValid && isValid.data === false)) {
        router.push("/404"); // Redirect to 404 page
      }
    }
  }, [router, isValid]);

  // Finding did user purchased this course or not
  const { data: purchaseData, isLoading: purchaseDataLoading } =
    useIsCoursePurchasedQuery(courseId);

  useEffect(() => {
    if (
      router &&
      !purchaseDataLoading &&
      currentUser &&
      currentUser.role === ENUM_USER_ROLES.STUDENT
    ) {
      if (!purchaseData || (purchaseData && purchaseData.data === null)) {
        router.push("/"); // Redirect to home page
      }
    }
  }, [router, purchaseData, currentUser]);

  if (isValidityLoading || purchaseDataLoading) {
    return <CourseModulePageSkeleton />;
  }

  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default CourseContentLayout;
