// Imports
import { Card, Col, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ICourse, ResponseSuccessType } from "@/types";
import { useCreateCourseMutation } from "@/redux/api/courseApi";
import swal from "sweetalert";
import Form from "@/components/ui/Forms/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/ui/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { CourseSchema } from "@/schemas/course";
import { convertToEmbedLink } from "@/utils/course";

const AdminCreateCourseCard = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);

  // Add Course Hook
  const [createCourse] = useCreateCourseMutation();

  // States
  const [courseCreating, setCourseCreating] = useState<boolean>(false);

  const handleCreateCourse: SubmitHandler<ICourse> = async (
    courseData: ICourse
  ) => {
    setCourseCreating(true);

    // Converting link to embedded if not
    const introVideoLink = convertToEmbedLink(courseData.introVideoLink);

    if (!introVideoLink) {
      setCourseCreating(false);
      swal(
        "Invalid Intro Video Link",
        "Please upload a valid YouTube video link. You can either upload YouTube video link or embedded link.",
        "error"
      );
    } else {
      courseData.introVideoLink = introVideoLink;
      // Modifying text input data to number
      courseData.price = parseFloat(courseData.price as unknown as string);
      courseData.projectsCount = parseInt(
        courseData.projectsCount as unknown as string
      );
      courseData.lecturesCount = parseInt(
        courseData.lecturesCount as unknown as string
      );
      try {
        const res: ResponseSuccessType = await createCourse({
          ...courseData,
        }).unwrap();
        if (res?.success) {
          swal(res.message, "", "success");
          setCourseCreating(false);
          setModalShow(false);
        }
      } catch (err: any) {
        setCourseCreating(false);
        swal(err?.message, "", "error");
      }
    }
  };

  return (
    <Col className="text-center">
      <Card
        className="h-100"
        style={{
          background: "#dae5e0",
          borderColor: "#dae5e0",
          minHeight: "420.688px",
        }}
      >
        <Card.Body className="d-flex flex-column justify-content-center">
          <Card.Title>Create New Course</Card.Title>
          <div>
            <Button
              onClick={() => setModalShow(true)}
              variant="success"
              size="lg"
              className="rounded-3"
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>

            <Modal show={modalShow} onHide={() => setModalShow(false)}>
              <Modal.Header closeButton>
                <Modal.Title>New Course</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form
                  submitHandler={handleCreateCourse}
                  resolver={zodResolver(CourseSchema.createAndUpdate)}
                >
                  <div className="mb-3">
                    <FormInput
                      name="title"
                      type="text"
                      label="Course Title"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <FormInput
                      name="description"
                      type="text"
                      label="Course Description"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <FormInput
                      name="instructorName"
                      type="text"
                      label="Instructor Name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <FormInput
                      name="price"
                      type="text"
                      label="Course Price"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <FormInput
                      name="thumbnailLink"
                      type="text"
                      label="Thumbnail Link"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <FormInput
                      name="introVideoLink"
                      type="text"
                      label="Intro Video Link"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <FormInput
                      name="lecturesCount"
                      type="text"
                      label="Total Lectures"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <FormInput
                      name="projectsCount"
                      type="text"
                      label="Total Projects"
                      required
                    />
                  </div>
                  {courseCreating ? (
                    <button className="btn btn-success w-100 mt-3" disabled>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Creating ...
                    </button>
                  ) : (
                    <button
                      className="btn btn-success mt-3 w-100"
                      type="submit"
                    >
                      Create Course
                    </button>
                  )}
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AdminCreateCourseCard;
