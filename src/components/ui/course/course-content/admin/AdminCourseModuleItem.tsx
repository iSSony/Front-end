// Imports
import React, { useState } from "react";
import {
  Card,
  Accordion,
  useAccordionButton,
  AccordionContext,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faFileArrowUp,
  faFilePen,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { ICourseModule } from "@/types";
import { useContext } from "react";
import AdminCourseContentButton from "./AdminCourseContentButton";
import AddContentModal from "./AddContentModal";
import EditModuleModal from "./EditModuleModal";

const AdminCourseModuleItem = ({
  courseId,
  module,
}: {
  courseId: string;
  module: ICourseModule;
}) => {
  // Router
  const router = useRouter();

  //States
  const [addContentModalShow, setAddContentModalShow] =
    useState<boolean>(false);
  const [editModuleModalShow, setEditModuleModalShow] =
    useState<boolean>(false);

  const handleModuleClick = useAccordionButton(module._id);
  const { activeEventKey } = useContext(AccordionContext);

  const isCurrentEventKey = activeEventKey === module._id;

  const handleContentClick = (contentId: string) => {
    const routePattern = `/course-content/admin/${courseId}/[${module._id}]/[${contentId}]`;
    const routeUrl = `/course-content/admin/${courseId}/${module._id}/${contentId}`;
    router.push(routePattern, routeUrl);
  };

  return (
    <Card className="moduleCard">
      <Card.Header
        onClick={handleModuleClick}
        className="d-flex justify-content-between align-items-center"
      >
        <div className="d-flex align-items-start">
          <span
            className="my-0 me-1"
            onClick={(event) => {
              event.stopPropagation();
              setEditModuleModalShow(true);
            }}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon color="#6c757d" icon={faFilePen} />
          </span>
          <p className="m-0 module-title">
            Module {module?.moduleNumber}: {module?.moduleName}
          </p>
        </div>
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
            <AdminCourseContentButton
              key={content._id}
              courseId={courseId}
              module={module}
              content={content}
              handleContentClick={handleContentClick}
            />
          ))}
          <button
            onClick={() => setAddContentModalShow(true)}
            className="btn w-100"
            style={{ backgroundColor: "#dae5e0" }}
          >
            Add Content
            <FontAwesomeIcon className="ms-2" icon={faFileArrowUp} />
          </button>
          <AddContentModal
            moduleId={module._id}
            modalShow={addContentModalShow}
            setModalShow={setAddContentModalShow}
          />
        </Card.Body>
      </Accordion.Collapse>

      <EditModuleModal
        module={module}
        courseId={courseId}
        modalShow={editModuleModalShow}
        setModalShow={setEditModuleModalShow}
      />
    </Card>
  );
};

export default AdminCourseModuleItem;
