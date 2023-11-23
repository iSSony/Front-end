// Imports
import { Col } from "react-bootstrap";

const ContentViewSkeleton = () => {
  return (
    <Col className="col-12 col-lg-8 mb-4 mb-lg-0">
      <svg
        className="bd-placeholder-img card-img-top"
        width="100%"
        height="414"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Placeholder"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#868e96"></rect>
      </svg>
      <div className="mt-3 d-flex flex-lg-row flex-column justify-content-between align-items-start">
        <h4 className="placeholder-glow col-6">
          <span className="placeholder col-12"></span>
        </h4>
        <div className="mt-2 mt-lg-0">
          <a
            href="#"
            className="placeholder disabled btn btn-success rounded-pill me-2 moduleContentControlButtons"
          ></a>
          <a
            href="#"
            className="placeholder disabled btn btn-success rounded-pill moduleContentControlButtons"
          ></a>
        </div>
      </div>
    </Col>
  );
};

export default ContentViewSkeleton;
