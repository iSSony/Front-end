// Imports
import styles from "@/styles/InfoSection.module.css";

const InfoSection = () => {
  return (
    <div className="my-3 py-3 my-xl-5 py-xl-5">
      <div className="mx-auto row">
        <div className="text-start col-xl-5 p-0">
          <div className="mb-4">
            <h3 className="fw-bold">Learning something just got easier</h3>
            <p>
              No more asking around when it comes to learn new skills. Brevemod
              is the platform for effectively learning new technologies and
              skills current popular in industry.
            </p>
          </div>
          <div>
            <div className="mb-3">
              <span className="d-flex align-items-center mb-2">
                <span className="fs-3">📚</span>
                <h5 className="fw-bold mb-0 ms-3 ms-xl-2">Find a course</h5>
              </span>
              <p>
                We've introduced top courses based on market research that are
                essential in today's world. Search for the course you are
                looking for and get started.
              </p>
            </div>
            <div className="mb-3">
              <span className="d-flex align-items-center mb-2">
                <span className="fs-3">💳</span>
                <h5 className="fw-bold mb-0 ms-3 ms-xl-2">Purchase a course</h5>
              </span>
              <p>
                We are giving the biggest sale of the year so don't forget to
                grab the opportunity.
              </p>
            </div>
            <div>
              <span className="d-flex align-items-center mb-2">
                <span className="fs-3">👨‍💻</span>
                <h5 className="fw-bold mb-0 ms-3 ms-xl-2">
                  Learn something daily
                </h5>
              </span>
              <p>
                Keep on completing short modules daily and get one step closer
                to your goal.
              </p>
            </div>
            <div>
              <span className="d-flex align-items-center mb-2">
                <span className="fs-3">😎</span>
                <h5 className="fw-bold mb-0 ms-3 ms-xl-2">Become a pro</h5>
              </span>
              <p>
                After being consistent with strong dedication for some months
                you will eventually become a pro in the field.
              </p>
            </div>
          </div>
        </div>
        <div className="shadow p-4 rounded-3 col-xl-6 mt-4 mt-xl-0 ms-auto">
          <ul className={styles.progressBar}>
            <li
              className={`${styles.progressBarList} ${styles.progressBarActive} ${styles.progressAccount}`}
            ></li>
            <li
              className={`${styles.progressBarList} ${styles.progressPersonal}`}
            ></li>
            <li
              className={`${styles.progressBarList} ${styles.progressPayment}`}
            ></li>
            <li
              className={`${styles.progressBarList} ${styles.progressConfirm}`}
            ></li>
          </ul>

          <div className="text-start col-xl-9">
            <div className="mb-4">
              <h5 className="fw-bold">
                Add courses in
                <span className="text-success ms-1 me-2">Cart</span>
                <span className="fs-3">🛒</span>
              </h5>
              <p>Choose a course from course page and add it to your cart.</p>
            </div>
            <div className="mb-4">
              <h5 className="fw-bold">
                Pay with your
                <span className="text-success ms-1 me-2">Card</span>
                <span className="fs-3">💳</span>
              </h5>
              <p>
                <p>
                  After reviewing your courses go to checkout and fill up the
                  details and purchase the course you want.
                </p>
              </p>
            </div>
            <div className="mb-4">
              <h5 className="fw-bold">
                Go to
                <span className="text-success ms-1 me-2">My Classes</span>
                <span className="fs-3">🏫</span>
              </h5>
              <p>
                After successful payment you will be able to see your purchased
                course in My Classes page.
              </p>
            </div>
            <div className="mb-4">
              <h5 className="fw-bold">
                Start watching
                <span className="text-success ms-1 me-2">Module Contents</span>
                <span className="fs-3">👀</span>
              </h5>
              <p>
                Complete daily short modules and feel free to ask us if you have
                any doubts in topics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
