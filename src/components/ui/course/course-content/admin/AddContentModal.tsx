// Imports
import { IModuleContent, ResponseSuccessType } from "@/types";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import swal from "sweetalert";
import { useAddContentToModuleMutation } from "@/redux/api/courseModuleApi";
import Form from "@/components/ui/Forms/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/ui/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { CourseContentSchema } from "@/schemas/courseContent";
import FormSelectField from "@/components/ui/Forms/FormSelectField";
import { contentTypesOptions } from "@/constants/common";
import { convertToEmbedLink } from "@/utils/course";

type IAddContentModalProps = {
  moduleId: string;
  modalShow: boolean;
  setModalShow: (state: boolean) => void;
};

const AddContentModal = ({
  moduleId,
  modalShow,
  setModalShow,
}: IAddContentModalProps) => {
  // Add Content Hook
  const [addContent] = useAddContentToModuleMutation();

  // States
  const [contentUploading, setContentUploading] = useState<boolean>(false);

  const handleAddContent: SubmitHandler<IModuleContent> = async (
    contentData: IModuleContent
  ) => {
    setContentUploading(true);

    // Converting link to embedded if not
    const contentLink = convertToEmbedLink(contentData.link);

    if (!contentLink) {
      setContentUploading(false);
      swal(
        "Invalid Content Link",
        contentData.type === "video"
          ? "Please upload a valid YouTube Video link. You can either upload YouTube Video link or embedded link."
          : "Please upload a valid Google Form link. You can either upload Google Form link or embedded link.",
        "error"
      );
    } else {
      contentData.link = contentLink;

      if (contentData?.duration) {
        contentData.duration = parseInt(
          contentData.duration as unknown as string
        );
      }
      try {
        const payload = {
          moduleId,
          contentData,
        };
        const res: ResponseSuccessType = await addContent(payload).unwrap();
        if (res?.success) {
          swal(res.message, "", "success");
          setContentUploading(false);
          setModalShow(false);
        }
      } catch (err: any) {
        setContentUploading(false);
        swal(err?.message, "", "error");
      }
    }
  };

  return (
    <>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            submitHandler={handleAddContent}
            resolver={zodResolver(CourseContentSchema.createAndUpdate)}
          >
            <div className="mb-3">
              <FormInput
                name="title"
                type="text"
                label="Content Title"
                required
              />
            </div>

            <div className="mb-3">
              <FormSelectField
                name="type"
                label="Select content type"
                required
                options={contentTypesOptions}
              />
            </div>
            <div className="mb-3">
              <FormInput
                name="link"
                type="text"
                label="Content Link"
                required
              />
            </div>
            <div className="mb-3">
              <FormInput name="duration" type="text" label="Content Duration" />
            </div>

            {contentUploading ? (
              <button className="btn btn-success w-100 mt-3" disabled>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Uploading...
              </button>
            ) : (
              <button className="btn btn-success mt-3 w-100" type="submit">
                Add Content
              </button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddContentModal;
