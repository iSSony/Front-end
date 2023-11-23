// Imports
import { useCreateModuleMutation } from "@/redux/api/courseModuleApi";
import { ICourseModule, ResponseSuccessType } from "@/types";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import swal from "sweetalert";
import Form from "@/components/ui/Forms/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/ui/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { CourseModelSchema } from "@/schemas/courseModel";

type IAddModuleModalProps = {
  courseId: string;
  modalShow: boolean;
  setModalShow: (state: boolean) => void;
};

const AddModuleModal = ({
  courseId,
  modalShow,
  setModalShow,
}: IAddModuleModalProps) => {
  // Create Module hook
  const [createModule] = useCreateModuleMutation();
  // States
  const [moduleCreating, setModuleCreating] = useState<boolean>(false);

  const handleCreateModule: SubmitHandler<ICourseModule> = async (
    moduleData: ICourseModule
  ) => {
    setModuleCreating(true);
    try {
      const moduleCreateData = { courseId, moduleName: moduleData.moduleName };
      const res: ResponseSuccessType = await createModule({
        ...moduleCreateData,
      }).unwrap();

      if (res?.success) {
        swal(res.message, "", "success");
        setModuleCreating(false);
        setModalShow(false);
      }
    } catch (err: any) {
      setModuleCreating(false);
      swal(err?.message, "", "error");
    }
  };

  return (
    <>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Module</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            submitHandler={handleCreateModule}
            resolver={zodResolver(CourseModelSchema.createAndUpdate)}
          >
            <div className="mb-3">
              <FormInput
                name="moduleName"
                type="text"
                label="Name of module"
                required
                placeholder="Introduction to Node.js"
              />
            </div>

            {moduleCreating ? (
              <button className="btn btn-success w-100 mt-3" disabled>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Creating...
              </button>
            ) : (
              <button className="btn btn-success mt-3 w-100" type="submit">
                Create Module
              </button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddModuleModal;
