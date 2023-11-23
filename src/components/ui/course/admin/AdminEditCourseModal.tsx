// Imports
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ICourse, ResponseSuccessType } from "@/types";
import { useUpdateCourseMutation } from "@/redux/api/courseApi";
import swal from "sweetalert";
import Form from "@/components/ui/Forms/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/ui/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { CourseSchema } from "@/schemas/course";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { isObjectFieldValuesEqual } from "@/utils/common";
import { convertToEmbedLink } from "@/utils/course";

const AdminEditCourseModal = ({ course }: { course: ICourse }) => {
  const [modalShow, setModalShow] = useState<boolean>(false);

  // Update Course Hook
  const [updateCourse] = useUpdateCourseMutation();

  // States
  const [courseUpdating, setCourseUpdating] = useState<boolean>(false);

  const defaultValues = {
    title: course.title,
    description: course.description,
    instructorName: course.instructorName,
    price: course.price.toString(),
    thumbnailLink: course.thumbnailLink,
    introVideoLink: course.introVideoLink,
    lecturesCount: course.lecturesCount.toString(),
    projectsCount: course.projectsCount.toString(),
  };

  const handleUpdateCourse: SubmitHandler<ICourse> = async (
    courseData: ICourse
  ) => {
    setCourseUpdating(true);
    if (isObjectFieldValuesEqual(courseData, defaultValues)) {
      swal(
        "Nothing to update",
        "You didn't make any changes in course data.",
        "warning"
      );
      setCourseUpdating(false);
    } else {
      // Converting link to embedded if not
      const introVideoLink = convertToEmbedLink(courseData.introVideoLink);

      if (!introVideoLink) {
        setCourseUpdating(false);
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
          const res: ResponseSuccessType = await updateCourse({
            courseId: course._id,
            courseData,
          }).unwrap();
          if (res?.success) {
            swal(res.message, "", "success");
            setCourseUpdating(false);
            setModalShow(false);
          }
        } catch (err: any) {
          setCourseUpdating(false);
          swal(err?.message, "", "error");
        }
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setModalShow(true)}
        className="btn btn-secondary text-white me-md-2 mt-2 mt-md-0 w-100"
      >
        Update Course Info <FontAwesomeIcon icon={faEdit} />
      </button>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Course Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            submitHandler={handleUpdateCourse}
            resolver={zodResolver(CourseSchema.createAndUpdate)}
            defaultValues={defaultValues}
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
            {courseUpdating ? (
              <button className="btn btn-success w-100 mt-3" disabled>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Updating ...
              </button>
            ) : (
              <button className="btn btn-success mt-3 w-100" type="submit">
                Update
              </button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminEditCourseModal;
