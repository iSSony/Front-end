// Imports
import { Card, Col, Button } from "react-bootstrap";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { ICourse } from "@/types";

const CourseCard = (props: { course: ICourse }) => {
  const { course } = props;
  const router = useRouter();

  const goToCourseDetails = () => {
    router.push(`/courses/${course._id}`);
  };

  return (
    <Col className="text-center">
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={course.thumbnailLink}
          className="img-fluid"
          style={{ height: "200px" }}
        />
        <Card.Body className="d-flex flex-column justify-content-around">
          <Card.Title>{course.title}</Card.Title>
          <Card.Text className="text-center">
            <small>{course.instructorName}</small>
            <div className="d-flex justify-content-center mt-1">
              {course.avgRating !== 0 && (
                <span className="me-1 rating">
                  {course.avgRating.toFixed(1)}
                </span>
              )}
              <Rating
                className="me-1"
                initialRating={course.avgRating}
                emptySymbol={
                  <FontAwesomeIcon icon={faStar} color="whitesmoke" />
                }
                fullSymbol={<FontAwesomeIcon icon={faStar} color="gold" />}
                readonly
              ></Rating>
              {course.ratingCount !== 0 && (
                <small>({course.ratingCount})</small>
              )}
            </div>
            <div className="d-flex justify-content-center mt-2">
              <span className="fw-bold fs-5">${course.price}</span>
            </div>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-center">
          <Button
            onClick={goToCourseDetails}
            variant="outline-success"
            className="w-100"
          >
            Preview Course
            <FontAwesomeIcon icon={faAngleDoubleRight} className="ms-2" />
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CourseCard;
