// Imports
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faFolder,
  faUserGraduate,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

const AdminCourseAnalytics = ({
  studentsCount,
  modulesCount,
  contentsCount,
  avgRatingCount,
}: {
  studentsCount: number;
  modulesCount: number;
  contentsCount: number;
  avgRatingCount: number;
}) => {
  return (
    <Col className="col-12 col-lg-8">
      <div className="row g-3 text-white h-100">
        <div className="col-lg-6">
          <div className="p-4 shadow-sm d-flex justify-content-around align-items-center rounded h-100 bg-secondary">
            <div className="col-8">
              <h3 className="fw-bold fs-2 m-0">{studentsCount}</h3>
              <p className="m-0">Students</p>
            </div>
            <span className="col-4 text-start">
              <FontAwesomeIcon
                icon={faUserGraduate}
                className="rounded-circle bg-dark p-3 m-0"
              />
            </span>
          </div>
        </div>

        <div className="col-lg-6">
          <div
            className="p-4 shadow-sm d-flex justify-content-around align-items-center rounded h-100"
            style={{ background: "#dae5e0" }}
          >
            <div className="col-8">
              <h3 className="fw-bold fs-2 m-0">{modulesCount}</h3>
              <p className="m-0">Modules</p>
            </div>
            <span className="col-4 text-start">
              <FontAwesomeIcon
                icon={faFolder}
                className="rounded-circle bg-dark p-3 m-0"
              />
            </span>
          </div>
        </div>
        <div className="col-lg-6">
          <div
            className="p-4  shadow-sm d-flex justify-content-around align-items-center rounded h-100"
            style={{ background: "#dae5e0" }}
          >
            <div className="col-8">
              <h3 className="fw-bold fs-2 m-0">{contentsCount}</h3>
              <p className="m-0">Contents</p>
            </div>
            <span className="col-4 text-start">
              <FontAwesomeIcon
                icon={faFile}
                className="rounded-circle bg-dark p-3 m-0"
              />
            </span>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="p-4 shadow-sm d-flex justify-content-around align-items-center rounded h-100 bg-secondary">
            <div className="col-8">
              <h3 className="fw-bold fs-2 m-0">{avgRatingCount}</h3>
              <p className="m-0">Avg Rating</p>
            </div>
            <span className="col-4 text-start">
              <FontAwesomeIcon
                icon={faStar}
                className="rounded-circle bg-dark p-3 m-0"
              />
            </span>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default AdminCourseAnalytics;
