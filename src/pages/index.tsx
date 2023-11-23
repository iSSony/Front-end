//Imports
import RootLayout from "@/components/Layouts/RootLayout";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { Row, Container } from "react-bootstrap";
import HeroSection from "@/components/ui/page-sections/HeroSection";
import { useCoursesQuery } from "@/redux/api/courseApi";
import { ICourse } from "@/types";
import CourseCard from "@/components/ui/course/CourseCard";
import CourseSkeleton from "@/components/ui/course/skeleton/CourseCardSkeleton";
import InfoSection from "@/components/ui/page-sections/InfoSection";

const HomePage: NextPageWithLayout = () => {
  const topFourHighestAvgRatedCoursesQuery = {
    sortBy: "avgRating",
    sortOrder: "desc",
    limit: 4,
  };
  const { data, isLoading } = useCoursesQuery(
    topFourHighestAvgRatedCoursesQuery
  );
  const courses = data?.data as ICourse[];

  return (
    <Container>
      <section className="my-5">
        <HeroSection />
        <InfoSection />
        <div className="my-4 py-4 my-xl-5 py-xl-5">
          <div>
            <h1 className="mb-4 text-start">Explore Top Courses</h1>
            <Row xs={1} md={2} xl={4} className="g-4">
              {isLoading
                ? [...Array(4).keys()].map((index: number) => (
                    <CourseSkeleton key={index} />
                  ))
                : courses?.map((course) => (
                    <CourseCard key={course._id} course={course} />
                  ))}
            </Row>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
