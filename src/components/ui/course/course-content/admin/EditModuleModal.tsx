// Imports
import { useUpdateModuleMutation } from "@/redux/api/courseModuleApi";
import { ICourseModule, ResponseSuccessType } from "@/types";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import swal from "sweetalert";
import Form from "@/components/ui/Forms/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/ui/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { CourseModelSchema } from "@/schemas/courseModel";
import { isObjectFieldValuesEqual } from "@/utils/common";

type IEditModuleModalProps = {
  module: ICourseModule;
  courseId: string;
  modalShow: boolean;
  setModalShow: (state: boolean) => void;
};

const EditModuleModal = ({
  module,
  courseId,
  modalShow,
  setModalShow,
}: IEditModuleModalProps) => {
  // Create Module hook
  const [updateModule] = useUpdateModuleMutation();
  // States
  const [moduleUpdating, setModuleUpdating] = useState<boolean>(false);

  // Form default values
  const defaultValues = {
    moduleName: module?.moduleName || "",
  };

  const handleUpdateModule: SubmitHandler<ICourseModule> = async (
    moduleData: ICourseModule
  ) => {
    setModuleUpdating(true);
    if (isObjectFieldValuesEqual(moduleData, defaultValues)) {
      swal(
        "Nothing to update",
        "You didn't make any changes in your content.",
        "warning"
      );
      setModuleUpdating(false);
    } else {
      try {
        const payload = {
          moduleName: moduleData.moduleName,
          moduleId: module._id,
        };
        const res: ResponseSuccessType = await updateModule({
          ...payload,
        }).unwrap();

        if (res?.success) {
          swal(res.message, "", "success");
          setModuleUpdating(false);
          setModalShow(false);
        }
      } catch (err: any) {
        setModuleUpdating(false);
        swal(err?.message, "", "error");
      }
    }
  };

  return (
    <>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Module {module?.moduleNumber}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            submitHandler={handleUpdateModule}
            resolver={zodResolver(CourseModelSchema.createAndUpdate)}
            defaultValues={defaultValues}
          >
            <div className="mb-3">
              <FormInput
                name="moduleName"
                type="text"
                label="Name of module"
                required
              />
            </div>

            {moduleUpdating ? (
              <button className="btn btn-success w-100 mt-3" disabled>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Updating...
              </button>
            ) : (
              <button className="btn btn-success mt-3 w-100" type="submit">
                Update Module
              </button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditModuleModal;
