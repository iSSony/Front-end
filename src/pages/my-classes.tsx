// Imports
import RootLayout from "@/components/Layouts/RootLayout";
import AuthLayout from "@/components/Layouts/AuthLayout";
import type { ReactElement } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { ICourse } from "@/types";
import { useAppSelector } from "@/redux/hooks";
import CoursesPageSkeleton from "@/components/ui/course/skeleton/CoursesPageSkeleton";
import { useMyCoursesQuery } from "@/redux/api/purchaseApi";
import MyCourseCard from "../components/ui/course/MyCourseCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const MyClassesPage = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const router = useRouter();

  const { data: myCoursesData, isLoading: myCoursesDataLoading } =
    useMyCoursesQuery({});
  const courses = myCoursesData?.data as ICourse[];

  return (
    <>
      {myCoursesDataLoading ? (
        <CoursesPageSkeleton />
      ) : (
        <div className="my-5 text-center">
          <Container>
            {courses?.length === 0 ? (
              <Row style={{ marginTop: "80px", marginBottom: "80px" }}>
                <Col lg="6" className="mx-auto shadow-lg mb-5 p-5 rounded-3">
                  <img
                    src="/EmptyCart.svg"
                    className="img-fluid mb-3 col-6"
                    alt="Empty Cart Image"
                  />

                  <h3>No Courses Purchased</h3>
                  <p>
                    You have not purchased any course. Please go back to home or
                    courses and purchase a course to continue learning.
                  </p>
                  <Button
                    onClick={() => router.push("/")}
                    variant="outline-success me-3"
                  >
                    Home <FontAwesomeIcon icon={faHome} />
                  </Button>
                  <Button
                    onClick={() => router.push("/courses")}
                    variant="outline-success"
                  >
                    Courses <FontAwesomeIcon icon={faAngleDoubleRight} />
                  </Button>
                </Col>
              </Row>
            ) : (
              <section style={{ marginBottom: "150px" }}>
                <div className="my-4">
                  <h3 className="fw-light mb-5">
                    Welcome back
                    <span className="fw-normal ms-1">
                      {currentUser?.firstName}
                    </span>
                    , ready for your next lesson?
                  </h3>
                  <Row xs={1} md={2} lg={4} className="g-4 mt-3 mb-5">
                    {courses?.map((course: ICourse) => (
                      <MyCourseCard key={course._id} course={course} />
                    ))}
                  </Row>
                </div>
              </section>
            )}
          </Container>
        </div>
      )}
    </>
  );
};

export default MyClassesPage;

MyClassesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout onlyStudentAccess={true}>
      <RootLayout>{page}</RootLayout>
    </AuthLayout>
  );
};
