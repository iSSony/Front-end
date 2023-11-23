// Imports
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { IModuleContent, ResponseSuccessType } from "@/types";
import { useEffect } from "react";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import EditContentModal from "./EditContentModal";
import { useRemoveContentFromModuleMutation } from "@/redux/api/courseModuleApi";
import swal from "sweetalert";
import { ICourseModule } from "@/types";

// Props Type
type IAdminCourseContentButtonProps = {
  courseId: string;
  module: ICourseModule;
  content: IModuleContent;
  handleContentClick: (contentId: string) => void;
};

const AdminCourseContentButton = ({
  courseId,
  module,
  content,
  handleContentClick,
}: IAdminCourseContentButtonProps) => {
  const router = useRouter();

  const currentCourseId = router?.query?.courseId;
  const currentModuleId = router?.query?.moduleId;
  const currentContentId = router?.query?.contentId;

  // Remove content hook
  const [removeContent] = useRemoveContentFromModuleMutation();

  // States
  const [isContentCurrent, setIsContentCurrent] = useState<boolean>(false);
  const [editContentModalShow, setEditContentModalShow] =
    useState<boolean>(false);
  const [isContentRemoving, setIsContentRemoving] = useState<boolean>(false);

  useEffect(() => {
    if (
      currentCourseId === courseId &&
      currentModuleId === module?._id &&
      currentContentId === content._id
    ) {
      setIsContentCurrent(true);
    }
  }, [router]);

  const handleRemoveContent = () => {
    swal({
      title: "Are you sure ?",
      text: `The content "${content?.title}" from Module ${module.moduleNumber} will be removed permanently.`,
      icon: "warning",
      buttons: ["Cancel", "Ok"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        setIsContentRemoving(true);
        try {
          const payload = { moduleId: module._id, contentId: content._id };
          const res: ResponseSuccessType = await removeContent({
            ...payload,
          }).unwrap();

          if (res?.success) {
            swal(res.message, "", "success");
            setIsContentRemoving(false);
          }
        } catch (err: any) {
          setIsContentRemoving(false);
          swal(err?.message, "", "error");
        }
      }
    });
  };

  return (
    <>
      {isContentCurrent ? (
        <button className="currentModuleContentBtn bg-success text-white">
          <span className="d-flex align-items-center">
            <FontAwesomeIcon
              color="white"
              className="me-1"
              icon={faCirclePlay}
            />
            <p className="mb-0">{content?.title}</p>
          </span>
          <span>{content.duration}m</span>
        </button>
      ) : (
        <>
          {isContentRemoving ? (
            <button
              disabled
              className="moduleContentBtn d-flex align-items-center justify-content-center"
            >
              Removing Content
              <span
                className="text-danger spinner-border spinner-border-sm ms-2"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          ) : (
            <button
              className="moduleContentBtn"
              onClick={() => handleContentClick(content._id)}
            >
              <span className="d-flex align-items-center">
                <FontAwesomeIcon
                  color="#006B5A"
                  className="me-1"
                  icon={faCircleCheck}
                />
                <p className="m-0">{content?.title}</p>
              </span>
              <div className="d-flex align-items-start">
                <span
                  onClick={(event) => {
                    event.stopPropagation();
                    setEditContentModalShow(true);
                  }}
                >
                  <FontAwesomeIcon color="#6c757d" icon={faEdit} />
                </span>
                <span
                  className="ms-2"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleRemoveContent();
                  }}
                >
                  <FontAwesomeIcon color="#dc3545" icon={faTrash} />
                </span>
              </div>
            </button>
          )}
        </>
      )}
      <EditContentModal
        content={content}
        moduleId={module?._id}
        modalShow={editContentModalShow}
        setModalShow={setEditContentModalShow}
      />
    </>
  );
};

export default AdminCourseContentButton;
