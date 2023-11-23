// Imports
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faForward } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ICourse, ResponseSuccessType } from "@/types";
import {
  useCourseProgressQuery,
  useStartCourseMutation,
} from "@/redux/api/courseProgressApi";
import { useIsCourseContentPublishedQuery } from "@/redux/api/courseModuleApi";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ProgressBar } from "react-bootstrap";
import CourseCardSkeleton from "./skeleton/CourseCardSkeleton";

const MyCourseCard = ({ course }: { course: ICourse }) => {
  const {
    data: courseContentPublishData,
    isLoading: courseContentPublishDataLoading,
  } = useIsCourseContentPublishedQuery(course._id);
  const isCourseContentPublished = courseContentPublishData?.data;

  const {
    data: courseProgressData,
    refetch,
    isLoading: courseProgressDataLoading,
  } = useCourseProgressQuery(course._id);
  const courseProgress = courseProgressData?.data;

  const [isCourseStarted, setIsCourseStarted] = useState<boolean>(
    courseProgress ? true : false
  );

  const [startCourse] = useStartCourseMutation();

  const router = useRouter();

  useEffect(() => {
    if (courseProgress) {
      setIsCourseStarted(true);
    } else {
      setIsCourseStarted(false);
    }
  }, [courseProgressData, courseProgress]);

  const handleStartCourse = async () => {
    try {
      const res: ResponseSuccessType = await startCourse(course._id).unwrap();
      console.log(res);
      if (res?.success) {
        refetch();
        setIsCourseStarted(true);
        swal(res.message, "", "success");
      }
    } catch (err: any) {
      swal(err?.message, "", "error");
    }
  };

  const handleContinueCourse = async () => {
    const { courseId } = courseProgress;
    const { moduleId, contentId } = courseProgress.current;
    const navigateContentRoute = `/course-content/${courseId}/${moduleId}/${contentId}`;
    router.push(navigateContentRoute);
  };

  return (
    <>
      {courseContentPublishDataLoading || courseProgressDataLoading ? (
        <CourseCardSkeleton />
      ) : (
        <div className="col text-center">
          <div className="card h-100">
            <img
              src={course.thumbnailLink}
              className="card-img-top img-fluid"
              alt="..."
              style={{ height: "200px" }}
            />
            <div className="card-body course d-flex flex-column justify-content-around">
              <p className="card-title fw-bold">{course.title}</p>
              <div className="card-text">
                <small>{course.instructorName}</small>
                <br />
                <div className="progress col-10 mx-auto mt-2">
                  <ProgressBar
                    className="w-100 mb-0"
                    variant="success"
                    now={courseProgress?.percentage || 0}
                    label={`${courseProgress?.percentage || 0}%`}
                  />
                </div>
              </div>
            </div>
            <div className="card-footer ">
              {isCourseContentPublished ? (
                <>
                  {isCourseStarted ? (
                    <button
                      onClick={handleContinueCourse}
                      className="btn btn-success w-100"
                    >
                      Continue Course
                      <FontAwesomeIcon className="ms-1" icon={faForward} />
                    </button>
                  ) : (
                    <button
                      onClick={handleStartCourse}
                      className="btn btn-outline-success w-100"
                    >
                      Start Course
                      <FontAwesomeIcon className="ms-1" icon={faCirclePlay} />
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button disabled className="btn btn-secondary w-100">
                    Content Not Uploaded
                  </button>
                </>
              )}
              {}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyCourseCard;
