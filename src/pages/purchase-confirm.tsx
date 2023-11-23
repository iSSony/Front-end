// Imports
import RootLayout from "@/components/Layouts/RootLayout";
import type { ReactElement } from "react";
import { useRouter } from "next/router";
const PurchaseConfirmationPage = () => {
  const router = useRouter();
  return (
    <div className="text-center my-5 col-9 col-md-8 col-lg-6 mx-auto">
      <img
        src="/PurchaseConfirm.svg"
        className="img-fluid col-8 col-md-6 col-lg-4 mx-auto mb-4"
        alt="Payment Image"
      />
      <h1 className="display-3"> Thank You!</h1>
      <p className="lead">
        <strong className="ms-1">Course Purchased Successfully</strong> You can
        now view your courses in my classes page and continue learning.
      </p>
      <hr></hr>
      <p>
        Having trouble?
        <a
          className="ms-1"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/shadmansaalim"
        >
          Contact us
        </a>
      </p>
      <p className="lead">
        <button
          onClick={() => router.push("/my-classes")}
          className="btn btn-outline-success"
        >
          My Classes
        </button>
      </p>
    </div>
  );
};

export default PurchaseConfirmationPage;

PurchaseConfirmationPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
