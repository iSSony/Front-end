// Imports
import React from "react";
import {
  Card,
  Accordion,
  useAccordionButton,
  AccordionContext,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { ICourseModule } from "@/types";
import CourseContentButton from "./CourseContentButton";
import { useContext } from "react";
import { IUserCourseProgress } from "@/types";

const CourseModuleItem = ({
  courseProgress,
  courseId,
  module,
}: {
  courseProgress: IUserCourseProgress;
  courseId: string;
  module: ICourseModule;
}) => {
  // Router
  const router = useRouter();

  const handleModuleClick = useAccordionButton(module._id);
  const { activeEventKey } = useContext(AccordionContext);

  const isCurrentEventKey = activeEventKey === module._id;

  const handleContentClick = (contentId: string) => {
    const routePattern = `/course-content/${courseId}/[${module._id}]/[${contentId}]`;
    const routeUrl = `/course-content/${courseId}/${module._id}/${contentId}`;
    router.push(routePattern, routeUrl);
  };

  return (
    <Card className="moduleCard">
      <Card.Header
        onClick={handleModuleClick}
        className="d-flex justify-content-between align-items-center"
      >
        <p className="m-0 module-title">
          Module {module?.moduleNumber}: {module?.moduleName}
        </p>

        <button className="btn btn-dark">
          {isCurrentEventKey ? (
            <FontAwesomeIcon icon={faMinus} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </button>
      </Card.Header>
      <Accordion.Collapse eventKey={module._id}>
        <Card.Body>
          {module?.moduleContents?.map((content: any) => (
            <CourseContentButton
              key={content._id}
              courseProgress={courseProgress}
              courseId={courseId}
              moduleId={module._id}
              content={content}
              handleContentClick={handleContentClick}
            />
          ))}
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default CourseModuleItem;
