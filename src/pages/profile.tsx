// Imports
import RootLayout from "@/components/Layouts/RootLayout";
import type { ReactElement } from "react";
import { Container, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import swal from "sweetalert";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { useUpdateUserProfileMutation } from "@/redux/api/profileApi";
import { ResponseSuccessType } from "@/types";
import { setCurrentUser } from "@/redux/slices/userSlice";
import styles from "../styles/profilePage.module.css";
import { isObjectFieldValuesEqual } from "@/utils/common";
import Form from "@/components/ui/Forms/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "@/schemas/user";
import FormInput from "@/components/ui/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";

type IUserProfileData = {
  firstName: string;
  middleName: string;
  lastName: string;
};

const ProfilePage = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [updateUserProfile] = useUpdateUserProfileMutation();

  // States
  const [editable, setEditable] = useState(false);
  const [updating, setUpdating] = useState(false);
  const defaultValues = {
    firstName: currentUser?.firstName || "",
    middleName: currentUser?.middleName || "",
    lastName: currentUser?.lastName || "",
  };

  const handleUpdateUserProfile: SubmitHandler<IUserProfileData> = async (
    profileData: IUserProfileData
  ) => {
    setUpdating(true);

    if (isObjectFieldValuesEqual(profileData, defaultValues)) {
      swal(
        "Nothing to update",
        "You didn't make any changes in your profile.",
        "warning"
      );
      setUpdating(false);
    } else {
      try {
        const res: ResponseSuccessType = await updateUserProfile({
          ...profileData,
        }).unwrap();

        if (res?.success) {
          dispatch(setCurrentUser(res?.data));
          swal(res?.message, "", "success");
          setEditable(false);
        }

        setUpdating(false);
      } catch (err: any) {
        swal(err?.data?.message || err?.message, "", "error");
        setUpdating(false);
      }
    }
  };

  return (
    <div className="my-5">
      <Container className="d-flex justify-content-center">
        <div className={`mx-auto col-12 col-lg-9 ${styles.profileWrapper}`}>
          <div className="text-center">
            <Image
              src="/ProfileIcon.png"
              className="img-fluid"
              width={80}
              height={80}
              id="profile-dropdown"
              alt="Profile Icon"
            />
          </div>
          <div className="mt-2 text-center">
            <span>Email : </span>
            <span>{currentUser?.email}</span>
            <hr />
          </div>
          {editable ? (
            <Form
              submitHandler={handleUpdateUserProfile}
              resolver={zodResolver(UserSchema.profileUpdate)}
              defaultValues={defaultValues}
            >
              <div className="mt-3 text-start">
                <div className="mb-4">
                  <FormInput
                    name="firstName"
                    type="text"
                    label="First Name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <FormInput
                    name="middleName"
                    type="text"
                    label="Middle Name"
                  />
                </div>
                <div className="mb-4">
                  <FormInput
                    name="lastName"
                    type="text"
                    label="Last Name"
                    required
                  />
                </div>
                <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center">
                  {updating ? (
                    <button className="btn btn-success w-100 disabled">
                      <span className="m-0">Loading</span>
                      <Spinner
                        className="m-0 ms-2"
                        animation="border"
                        size="sm"
                      />
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-success w-100">
                      Save Changes <FontAwesomeIcon icon={faEdit} />
                    </button>
                  )}
                  <button
                    onClick={() => setEditable(false)}
                    className="btn btn-secondary ms-lg-2 w-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Form>
          ) : (
            <div className="mt-3 text-start">
              <div className="mb-4">
                <div className="mb-2">First Name</div>
                <span
                  className={`p-2 rounded-3 w-100 d-flex align-items-center ${styles.profileData}`}
                >
                  {currentUser?.firstName}
                </span>
              </div>
              <div className="mb-4">
                <div className="mb-2">Middle Name</div>
                <span
                  className={`p-2 rounded-3 w-100 d-flex align-items-center ${styles.profileData}`}
                >
                  {currentUser?.middleName}
                </span>
              </div>
              <div className="mb-4">
                <div className="mb-2">LastName</div>
                <span
                  className={`p-2 rounded-3 w-100 d-flex align-items-center ${styles.profileData}`}
                >
                  {currentUser?.lastName}
                </span>
              </div>
              <div>
                <button
                  className="btn btn-secondary me-md-3 w-100"
                  onClick={() => setEditable(true)}
                >
                  Update Profile <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout>
      <RootLayout>{page}</RootLayout>
    </AuthLayout>
  );
};
