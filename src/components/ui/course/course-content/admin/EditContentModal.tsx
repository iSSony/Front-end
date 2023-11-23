// Imports
import { IModuleContent, ResponseSuccessType } from "@/types";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import swal from "sweetalert";
import { useUpdateContentInModuleMutation } from "@/redux/api/courseModuleApi";
import { isObjectFieldValuesEqual } from "@/utils/common";
import Form from "@/components/ui/Forms/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/ui/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { CourseContentSchema } from "@/schemas/courseContent";
import FormSelectField from "@/components/ui/Forms/FormSelectField";
import { contentTypesOptions } from "@/constants/common";
import { convertToEmbedLink } from "@/utils/course";

type IEditContentModalProps = {
  content: IModuleContent;
  moduleId: string;
  modalShow: boolean;
  setModalShow: (state: boolean) => void;
};

const EditContentModal = ({
  content,
  moduleId,
  modalShow,
  setModalShow,
}: IEditContentModalProps) => {
  // Update Content Hook
  const [updateContent] = useUpdateContentInModuleMutation();

  // States
  const [contentUploading, setContentUploading] = useState<boolean>(false);

  // Form default values
  const defaultValues = {
    title: content?.title || "",
    type: content?.type,
    link: content?.link || "",
    duration: content?.duration?.toString() || "",
  };

  const handleUpdateContent: SubmitHandler<IModuleContent> = async (
    contentData: IModuleContent
  ) => {
    setContentUploading(true);
    if (isObjectFieldValuesEqual(contentData, defaultValues)) {
      swal(
        "Nothing to update",
        "You didn't make any changes in your content.",
        "warning"
      );
      setContentUploading(false);
    } else {
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
            contentId: content._id,
            contentData,
          };
          const res: ResponseSuccessType = await updateContent(
            payload
          ).unwrap();
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
    }
  };

  return (
    <>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            submitHandler={handleUpdateContent}
            resolver={zodResolver(CourseContentSchema.createAndUpdate)}
            defaultValues={defaultValues}
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
                Update Content
              </button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditContentModal;
