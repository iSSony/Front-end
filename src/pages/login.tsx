/* eslint no-use-before-define: 0 */
// Imports
import React from "react";
import Link from "next/link";
import RootLayout from "@/components/Layouts/RootLayout";
import type { ReactElement } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { ResponseSuccessType } from "@/types";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/router";
import swal from "sweetalert";
import { useAppDispatch } from "@/redux/hooks";
import { setCurrentUser } from "@/redux/slices/userSlice";
import { SubmitHandler } from "react-hook-form";
import Form from "@/components/ui/Forms/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "@/schemas/user";
import FormInput from "@/components/ui/Forms/FormInput";

type ILoginUser = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [userLogin] = useUserLoginMutation();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLoginSubmit: SubmitHandler<ILoginUser> = async (
    loginData: ILoginUser
  ) => {
    try {
      const res: ResponseSuccessType = await userLogin({
        ...loginData,
      }).unwrap();

      // Redirecting to profile page
      if (res?.success && res?.data?.accessToken) {
        // Storing user access token in to keep user authenticated
        storeUserInfo({ accessToken: res?.data?.accessToken });

        dispatch(setCurrentUser(res?.data?.user));

        router.push("/");
        swal(res.message, "", "success");
      }
    } catch (err: any) {
      swal(err?.message, "", "error");
    }
  };

  return (
    <section style={{ marginTop: 100, marginBottom: 150 }}>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-5 col-xl-5 mx-auto mb-4 mb-lg-0">
            <img src="/Login.svg" className="img-fluid" alt="Login Image" />
          </div>
          <div className="col-md-8 col-lg-5 col-xl-4 offset-xl-1 shadow-lg p-5 rounded-3 mx-auto">
            <Form
              submitHandler={handleLoginSubmit}
              resolver={zodResolver(UserSchema.login)}
            >
              <div className="mb-3">
                <FormInput
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="email321@example.com"
                  required
                />
              </div>
              <div className="mb-4">
                <FormInput
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="nxid392@!7"
                  required
                />
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <Button className="w-100" type="submit" variant="success">
                  Login <FontAwesomeIcon icon={faSignInAlt} />
                </Button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?
                  <Link href="/sign-up" className="link-danger ms-1">
                    Sign Up
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
