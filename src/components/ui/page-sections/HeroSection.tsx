// Imports
import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";

const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="my-3 py-3 my-xl-5 py-xl-5">
      <Row className="d-flex align-items-center">
        <Col
          xl="6"
          className="text-center text-xl-start mx-auto order-2 order-xl-1 mt-4 mt-xl-0"
        >
          <div>
            <h1>Want to learn consistently?</h1>
            <p>
              Explore our courses and get into our module based ecosystem where
              we will take care of your consistency in learning.
            </p>
            <Button
              onClick={() => router.push("/courses")}
              variant="outline-success"
              size="lg"
            >
              Browse Courses
            </Button>
          </div>
        </Col>
        <Col xl="6" className="mx-auto order-1 order-xl-2">
          <div className="text-center">
            <img className="img-fluid" src="./HeroSection.svg" alt="" />
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default HeroSection;
