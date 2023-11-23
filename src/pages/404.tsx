// Imports
import RootLayout from "@/components/Layouts/RootLayout";
import type { ReactElement } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className="text-center my-5 col-9 col-md-8 col-lg-6 mx-auto">
      <img
        src="/404.svg"
        className="img-fluid col-8 col-md-6 mx-auto mb-4"
        alt="Payment Image"
      />
      <h1 className="display-3">404 Page Not Found</h1>
      <p className="lead">The page you requested for does not exists.</p>
      <hr></hr>
      <p>
        Having trouble?
        <a
          className="ms-1 text-success"
          target="_blank"
          rel="noreferrer"
          href="https://saalim-shadman.web.app/"
        >
          Contact us
        </a>
      </p>
      <p className="lead">
        <button
          onClick={() => router.push("/")}
          className="btn btn-outline-success"
        >
          Home <FontAwesomeIcon className="ms-1" icon={faHome} />
        </button>
      </p>
    </div>
  );
};

export default NotFoundPage;

NotFoundPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
