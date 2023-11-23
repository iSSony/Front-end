// Imports
import { useState } from "react";
import { Button, Modal, InputGroup, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUnlock,
  faCheck,
  faCopy,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/router";
import { handleCopyClick } from "@/utils/common";
import { logoutUser } from "@/utils/user";

const AdminFeaturesInformation = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [adminFeaturesModalShow, setAdminFeaturesModalShow] = useState(false);
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const [isPasswordCopied, setIsPasswordCopied] = useState(false);

  return (
    <div className="">
      <Button
        onClick={() => setAdminFeaturesModalShow(true)}
        variant="secondary"
      >
        Want to see admin features?
        <FontAwesomeIcon className="ms-2" icon={faUnlock} />
      </Button>

      <Modal
        show={adminFeaturesModalShow}
        onHide={() => setAdminFeaturesModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Admin Credentials</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p className="light-font">
              Are you done exploring the student features of this application?
              If not, I would like to suggest you first explore the student
              features, such as adding courses to your cart, purchasing courses,
              viewing courses from my classes, starting courses, viewing course
              modules and contents, etc.
            </p>
            <p>
              If you have experienced student features, you are welcome to view
              admin features such as creating, updating, and removing course,
              creating course modules, adding content to course, removing
              unwanted content, etc.
            </p>
          </div>
          <div>
            <p>
              Copy the below email address and password to login as an admin and
              explore admin powerful features 💪
            </p>
            <hr />
            <InputGroup>
              <Form.Control
                value="admin@gmail.com"
                aria-label="Search courses"
                aria-describedby="basic-addon1"
              />

              {isEmailCopied ? (
                <InputGroup.Text
                  id="basic-addon1"
                  style={{ cursor: "pointer" }}
                  className="text-success"
                >
                  <FontAwesomeIcon className="fw-bold" icon={faCheck} />
                </InputGroup.Text>
              ) : (
                <InputGroup.Text
                  id="basic-addon1"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleCopyClick("admin@gmail.com");

                    setIsEmailCopied(true);
                    // Resetting after 3 seconds
                    setTimeout(() => {
                      setIsEmailCopied(false);
                    }, 2000);
                  }}
                >
                  <FontAwesomeIcon className="fw-bold" icon={faCopy} />
                </InputGroup.Text>
              )}
            </InputGroup>
          </div>
          <div className="mt-2">
            <InputGroup>
              <Form.Control
                value="123456"
                aria-label="Search courses"
                aria-describedby="basic-addon1"
              />

              {isPasswordCopied ? (
                <InputGroup.Text
                  id="basic-addon1"
                  style={{ cursor: "pointer" }}
                  className="text-success"
                >
                  <FontAwesomeIcon className="fw-bold" icon={faCheck} />
                </InputGroup.Text>
              ) : (
                <InputGroup.Text
                  id="basic-addon1"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleCopyClick("123456");

                    setIsPasswordCopied(true);
                    // Resetting after 3 seconds
                    setTimeout(() => {
                      setIsPasswordCopied(false);
                    }, 2000);
                  }}
                >
                  <FontAwesomeIcon className="fw-bold" icon={faCopy} />
                </InputGroup.Text>
              )}
            </InputGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setAdminFeaturesModalShow(false);
              logoutUser(dispatch, router, "/login");
            }}
            className="w-100"
            variant="secondary"
          >
            Logout and Redirect to Login
            <FontAwesomeIcon className="ms-2" icon={faRightFromBracket} />
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminFeaturesInformation;
