// Imports
import React from "react";
import Link from "next/link";
import RootLayout from "@/components/Layouts/RootLayout";
import type { ReactElement } from "react";
import { useUserSignUpMutation } from "@/redux/api/authApi";
import { ResponseSuccessType } from "@/types";
import { useRouter } from "next/router";
import swal from "sweetalert";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "@/schemas/user";
import Form from "@/components/ui/Forms/Form";
import FormInput from "@/components/ui/Forms/FormInput";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { SubmitHandler } from "react-hook-form";

type ISignUpUser = {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
};

const SignUpPage = () => {
  const [userSignUp] = useUserSignUpMutation();

  const router = useRouter();

  const handleSignUpSubmit: SubmitHandler<ISignUpUser> = async (
    signUpData: ISignUpUser
  ) => {
    try {
      const res: ResponseSuccessType = await userSignUp({
        ...signUpData,
      }).unwrap();

      if (res?.success) {
        swal(res?.message, "Please login to continue", "success");
        router.push("/");
      }
    } catch (err: any) {
      swal(err?.message, "", "error");
    }
  };

  return (
    <section className="my-5">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-10 mt-4">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: 25 }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center fw-bold mb-4 mb-lg-5 mx-1 mx-md-4 mt-4 mt-lg-0">
                      Sign Up and Start Learning from Today!
                    </p>
                    <Form
                      submitHandler={handleSignUpSubmit}
                      resolver={zodResolver(UserSchema.signUp)}
                    >
                      <div className="mb-3">
                        <FormInput
                          name="firstName"
                          type="text"
                          label="First Name"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <FormInput
                          name="middleName"
                          type="text"
                          label="Middle Name"
                        />
                      </div>

                      <div className="mb-3">
                        <FormInput
                          name="lastName"
                          type="text"
                          label="Last Name"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <FormInput
                          name="email"
                          type="email"
                          label="Email Address"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <FormInput
                          name="password"
                          type="password"
                          label="Password"
                          required
                        />
                      </div>

                      <div className="d-flex justify-content-center mb-3 mb-lg-4">
                        <Button
                          className="w-100"
                          type="submit"
                          variant="success"
                        >
                          Sign Up <FontAwesomeIcon icon={faUserPlus} />
                        </Button>
                      </div>

                      <div className="text-center">
                        <span className="me-1">Already a member?</span>
                        <Link href="/login" className="text-success">
                          Login
                        </Link>
                      </div>
                    </Form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-6 d-flex align-items-center order-1 order-lg-2 mx-auto">
                    <img
                      src="/SignUp.svg"
                      className="img-fluid"
                      alt="Sign Up Image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
