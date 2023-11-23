// Imports
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { IModuleContent } from "@/types";
import { useEffect } from "react";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { IUserCourseProgress } from "@/types";

// Props Type
type ICourseContentButtonProps = {
  courseProgress: IUserCourseProgress;
  courseId: string;
  moduleId: string;
  content: IModuleContent;
  handleContentClick: (contentId: string) => void;
};

const CourseContentButton = ({
  courseProgress,
  courseId,
  moduleId,
  content,
  handleContentClick,
}: ICourseContentButtonProps) => {
  const router = useRouter();

  const currentCourseId = router?.query?.courseId;
  const currentModuleId = router?.query?.moduleId;
  const currentContentId = router?.query?.contentId;

  const [isContentLocked, setIsContentLocked] = useState<boolean>(true);
  const [isContentCurrent, setIsContentCurrent] = useState<boolean>(false);

  useEffect(() => {
    if (
      currentCourseId === courseId &&
      currentModuleId === moduleId &&
      currentContentId === content._id
    ) {
      setIsContentCurrent(true);
    } else {
      if (courseProgress) {
        courseProgress.completed.forEach((checkContent: any) => {
          if (
            checkContent.moduleId === moduleId &&
            checkContent.contentId === content._id
          ) {
            setIsContentLocked(false);
            return;
          }
        });
      }
    }
  }, [router, courseProgress]);

  if (isContentCurrent) {
    return (
      <button className="currentModuleContentBtn bg-success text-white">
        <span className="d-flex align-items-center">
          <FontAwesomeIcon color="white" className="me-1" icon={faCirclePlay} />
          <p className="mb-0">{content?.title}</p>
        </span>
        <span>{content.duration}m</span>
      </button>
    );
  } else if (isContentLocked) {
    return (
      <button className="moduleContentBtn">
        <span className="d-flex align-items-center">
          <FontAwesomeIcon color="#2A4A5F" className="me-1" icon={faLock} />
          <p className="mb-0">{content?.title}</p>
        </span>
        <span>{content.duration}m</span>
      </button>
    );
  } else {
    return (
      <button
        className="moduleContentBtn"
        onClick={() => handleContentClick(content._id)}
      >
        <span className="d-flex align-items-center">
          <FontAwesomeIcon
            color="#006B5A"
            className="me-1"
            icon={faCircleCheck}
          />
          <p className="mb-0">{content?.title}</p>
        </span>
        <span>{content.duration}m</span>
      </button>
    );
  }
};

export default CourseContentButton;
