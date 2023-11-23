// Imports
import { Container, Row } from "react-bootstrap";
import CourseCardSkeleton from "./CourseCardSkeleton";

const CoursesPageSkeleton = () => {
  return (
    <Container>
      <div className="d-flex flex-column flex-lg-row align-items-center justify-content-lg-between mt-5 mb-3">
        <div className="col-12 col-lg-6 me-auto">
          <a
            href="#"
            className="btn btn-secondary disabled placeholder w-100"
            aria-hidden="true"
          ></a>
        </div>
        <div className="d-flex">
          <nav aria-label="...">
            <ul className="pagination m-0 mt-4 mt-lg-0">
              {
                <li className="page-item disabled">
                  <button
                    className="page-link disabled placeholder"
                    aria-label="Previous"
                  >
                    Previous
                  </button>
                </li>
              }
              {
                <li className="page-item disabled">
                  <button
                    className="page-link disabled placeholder"
                    aria-label="Next"
                  >
                    Next
                  </button>
                </li>
              }
            </ul>
          </nav>
        </div>
      </div>

      <section>
        <div>
          <Row xs={1} md={2} lg={4} className="g-4 mt-3 mb-5">
            {[...Array(8).keys()].map((index: number) => (
              <CourseCardSkeleton key={index} />
            ))}
          </Row>
        </div>
      </section>
    </Container>
  );
};

export default CoursesPageSkeleton;
