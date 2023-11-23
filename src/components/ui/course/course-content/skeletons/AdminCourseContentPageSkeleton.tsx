// Imports
import { Container, Row, Col } from "react-bootstrap";
import ContentSidebarSkeleton from "./ContentSidebarSkeleton";

const AdminCourseContentPageSkeleton = () => {
  return (
    <div>
      <div>
        <div className="text-start my-5">
          <Container>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
              <h2 className="card-title placeholder-glow">
                <span className="placeholder col-9"></span>
              </h2>
            </div>
            <Row>
              <Col className="col-12 col-lg-8">
                <div className="row g-3 text-white h-100">
                  {[...Array(4).keys()].map((index: number) => (
                    <div key={index} className="col-lg-6">
                      <div className="p-4 shadow-sm d-flex justify-content-around align-items-center rounded h-100 bg-secondary placeholder">
                        <div className="col-8 placeholder-glow">
                          <h3 className="fw-bold fs-2 m-0"></h3>
                          <p className="m-0"></p>
                        </div>
                        <span className="col-4 text-start"></span>
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
              <ContentSidebarSkeleton />
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default AdminCourseContentPageSkeleton;
