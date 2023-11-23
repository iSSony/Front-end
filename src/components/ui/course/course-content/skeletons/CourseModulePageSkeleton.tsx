// Imports
import { Container, Row } from "react-bootstrap";
import ContentSidebarSkeleton from "./ContentSidebarSkeleton";
import ContentViewSkeleton from "./ContentViewSkeleton";

const CourseModulePageSkeleton = () => {
  return (
    <div className="pb-5">
      <div>
        <div className="text-start my-5">
          <Container>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
              <h2 className="card-title placeholder-glow">
                <span className="placeholder col-9"></span>
              </h2>
            </div>
            <Row>
              <ContentViewSkeleton />
              <ContentSidebarSkeleton />
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default CourseModulePageSkeleton;
