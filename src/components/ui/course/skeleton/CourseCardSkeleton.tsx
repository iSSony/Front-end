import { Col } from "react-bootstrap";

const CourseCardSkeleton = () => {
  return (
    <Col className="text-center">
      <div className="card" aria-hidden="true">
        <svg
          className="bd-placeholder-img card-img-top"
          width="100%"
          height="200"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#868e96"></rect>
        </svg>
        <div className="card-body">
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-6"></span>
          </h5>
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-6"></span>
            <span className="placeholder col-8"></span>
          </p>
          <div className="text-center w-100">
            <a
              href="#"
              className="btn btn-success disabled placeholder col-12"
            ></a>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default CourseCardSkeleton;
