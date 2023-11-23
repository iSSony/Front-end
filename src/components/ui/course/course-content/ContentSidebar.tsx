// Imports
import { Col, ProgressBar, Accordion } from "react-bootstrap";
import { useState, useEffect } from "react";
import { ICourseModule, IUserCourseProgress } from "@/types";
import CourseModuleItem from "./CourseModuleItem";

// Props Type
type IContentSidebarProps = {
  courseProgress: IUserCourseProgress;
  modules: ICourseModule[];
  courseId: string;
  defaultActiveKey?: string;
};

const ContentSidebar = ({
  courseProgress,
  modules,
  courseId,
  defaultActiveKey,
}: IContentSidebarProps) => {
  // States
  const [addModuleModalShow, setAddModuleModalShow] = useState<boolean>(false);
  const progressPercentage = courseProgress?.percentage || 0;

  return (
    <Col className="col-12 col-lg-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0 fw-bold w-100">Course Progress</h5>
        <ProgressBar
          className="w-100 m-0"
          variant="success"
          now={progressPercentage}
          label={`${progressPercentage}%`}
        />
      </div>
      <div className="moduleList">
        {/* <input
          className="moduleSearchBar"
          placeholder="Search for module"
        ></input> */}

        <div className="modules">
          <Accordion defaultActiveKey={defaultActiveKey || ""}>
            {modules?.map((module: any) => (
              <CourseModuleItem
                courseProgress={courseProgress}
                key={module._id}
                courseId={courseId}
                module={module}
              />
            ))}
          </Accordion>
        </div>
      </div>
    </Col>
  );
};

export default ContentSidebar;
