// Imports
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className="text-center text-lg-start text-dark"
      style={{ backgroundColor: "#ECEFF1" }}
    >
      <section className="bg-dark text-white p-5">
        <div className="container text-center text-md-start ">
          <div className="row ">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">sony-project</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "rgb(33, 37, 41)",
                  height: "2px",
                }}
              />
              <p>
                A Full Stack application developed using technologies Next.js,
                Redux Node, Mongoose, MongoDB and more.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Membership</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "rgb(33, 37, 41)",
                  height: "2px",
                }}
              />
              <p>
                <a href="#!" className="text-white">
                  Fees & Terms
                </a>
              </p>
              <p>
                <a href="#!" className="text-white">
                  Student Stories
                </a>
              </p>
              <p>
                <a href="#!" className="text-white">
                  Course FAQ
                </a>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Jobs</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "rgb(33, 37, 41)",
                  height: "2px",
                }}
              />
              <p>
                <a href="#!" className="text-white">
                  Become a tutor
                </a>
              </p>
              <p>
                <a href="#!" className="text-white">
                  Types of tutors
                </a>
              </p>
              <p>
                <a href="#!" className="text-white">
                  Brevemodian Guidelines
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold">Community & Education</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "rgb(33, 37, 41)",
                  height: "2px",
                }}
              />
              <p>Community & Education</p>
              <p>Community & Partnerships</p>
              <p>Volunteers</p>
              <p>Education</p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center text-white p-3"
        style={{ backgroundColor: "#006b5a" }}
      >
        <small>
          © {new Date().getFullYear()} Copyright Application Developed by{" "}
          <Link
            className="text-white"
            href=""
            target="_blank"
          >
            SONY ISMAIL HOSSAIN
          </Link>
        </small>
      </div>
    </footer>
  );
};

export default Footer;
