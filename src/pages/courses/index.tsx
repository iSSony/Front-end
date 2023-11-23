// Imports
import RootLayout from "@/components/Layouts/RootLayout";
import type { ReactElement } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import { ICourse, IMeta } from "@/types";
import { useCoursesQuery } from "@/redux/api/courseApi";
import { useAppSelector, useDebounced } from "@/redux/hooks";
import CoursesPageSkeleton from "@/components/ui/course/skeleton/CoursesPageSkeleton";
import CourseCard from "../../components/ui/course/CourseCard";
import Pagination from "@/components/ui/Pagination";
import SearchBar from "@/components/ui/SearchBar";
import AdminCreateCourseCard from "@/components/ui/course/admin/AdminCreateCourseCard";
import { calcPaginationTotalPage } from "@/utils/common";
import { ENUM_USER_ROLES } from "@/enums/user";

const CoursesPage = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  const [activePage, setActivePage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getHighestAvgRatedCoursesQuery = {
    sortBy: "avgRating",
    sortOrder: "desc",
  };

  const query: Record<string, any> = {
    ...getHighestAvgRatedCoursesQuery,
  };

  query["page"] = activePage;

  // Optimizing API call for user search
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm && searchTerm.length > 0) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = useCoursesQuery({ ...query });
  const courses = data?.data as ICourse[];
  const meta = data?.meta as IMeta;
  const totalPage = calcPaginationTotalPage(meta, currentUser?.role);

  return (
    <>
      {isLoading ? (
        <CoursesPageSkeleton />
      ) : (
        <Container>
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-lg-between mt-5 mb-3">
            <div className="col-12 col-lg-6 me-auto">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
            {(courses.length > 0 || totalPage === activePage) && (
              <div className="mt-4 mt-lg-0">
                <Pagination
                  activePage={activePage}
                  setActivePage={setActivePage}
                  totalPage={totalPage}
                />
              </div>
            )}
          </div>
          <section>
            {searchTerm.length > 0 && courses.length === 0 ? (
              <Row
                style={{ marginTop: "80px", marginBottom: "80px" }}
                className="text-center"
              >
                <Col lg="6" className="mx-auto shadow-lg mb-5 p-5 rounded-3">
                  <img
                    src="/Empty.svg"
                    className="img-fluid mb-3 col-6"
                    alt="Empty Cart Image"
                  />
                  <p>No Courses found based on your search results.</p>
                </Col>
              </Row>
            ) : (
              <div>
                <Row xs={1} md={2} lg={4} className="g-4 mt-3 mb-5">
                  {courses?.map((course: ICourse) => (
                    <CourseCard key={course._id} course={course} />
                  ))}
                  {totalPage === activePage &&
                    currentUser &&
                    currentUser.role === ENUM_USER_ROLES.ADMIN && (
                      <AdminCreateCourseCard />
                    )}
                </Row>
              </div>
            )}
          </section>
        </Container>
      )}
    </>
  );
};

export default CoursesPage;

CoursesPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
