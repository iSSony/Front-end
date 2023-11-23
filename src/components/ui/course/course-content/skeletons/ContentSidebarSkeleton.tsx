// Imports
import { Col, Card, Accordion } from "react-bootstrap";

const ContentSidebarSkeleton = () => {
  return (
    <Col className="col-12 col-lg-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 placeholder-glow col-12">
          <span className="placeholder col-12 mb-0"></span>
        </h5>
      </div>
      <div className="moduleList">
        {/* <a
          href="#"
          className="btn disabled placeholder col-12"
          style={{ height: "60px", color: "#dae5e0" }}
        ></a> */}

        <div className="modules">
          <Accordion defaultActiveKey="1">
            {[...Array(5).keys()].map((index: number) => (
              <Card key={index} className="moduleCard  w-100">
                <Card.Header
                  className="d-flex justify-content-between align-items-start place-holder-glow"
                  style={{ height: "65px" }}
                >
                  <p className="mb-0 card-text placeholder-glow col-9">
                    <span className="placeholder col-12"></span>
                  </p>
                  <button
                    disabled
                    className="btn btn-dark"
                    style={{ width: "40px", height: "38px" }}
                  ></button>
                </Card.Header>
              </Card>
            ))}
          </Accordion>
        </div>
      </div>
    </Col>
  );
};

export default ContentSidebarSkeleton;
