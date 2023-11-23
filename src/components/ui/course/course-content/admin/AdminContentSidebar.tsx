// Imports
import { Col, Accordion } from "react-bootstrap";
import { useState } from "react";
import { ICourseModule } from "@/types";
import AddModuleModal from "./AddModuleModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import AdminCourseModuleItem from "./AdminCourseModuleItem";

// Props Type
type IAdminContentSidebarProps = {
  modules: ICourseModule[];
  courseId: string;
  defaultActiveKey?: string;
};

const AdminContentSidebar = ({
  modules,
  courseId,
  defaultActiveKey,
}: IAdminContentSidebarProps) => {
  // States
  const [addModuleModalShow, setAddModuleModalShow] = useState<boolean>(false);

  return (
    <Col className="col-12 col-lg-4">
      <div className="moduleList">
        {/* <input
          className="moduleSearchBar"
          placeholder="Search for module"
        ></input> */}
        <div className="modules">
          <Accordion defaultActiveKey={defaultActiveKey || ""}>
            {modules?.map((module: any) => (
              <AdminCourseModuleItem
                key={module._id}
                courseId={courseId}
                module={module}
              />
            ))}

            <button
              onClick={() => setAddModuleModalShow(true)}
              className="btn btn-dark w-100"
            >
              Add Module
              <FontAwesomeIcon className="ms-2" icon={faFolderPlus} />
            </button>
            <AddModuleModal
              courseId={courseId}
              modalShow={addModuleModalShow}
              setModalShow={setAddModuleModalShow}
            />
          </Accordion>
        </div>
      </div>
    </Col>
  );
};

export default AdminContentSidebar;
