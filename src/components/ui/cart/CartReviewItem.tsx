// Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStar } from "@fortawesome/free-solid-svg-icons";
import Rating from "react-rating";
import { useCourseQuery } from "@/redux/api/courseApi";
import { ICourse, ResponseSuccessType } from "@/types";
import { useRemoveFromCartMutation } from "@/redux/api/cartApi";
import { useAppDispatch } from "@/redux/hooks";
import { setCart } from "@/redux/slices/cartSlice";
import swal from "sweetalert";

const CartReviewItem = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useCourseQuery(id);
  const course = data?.data as ICourse;

  const [removeFromCart] = useRemoveFromCartMutation();

  const handleRemoveFromCart = async () => {
    try {
      const res: ResponseSuccessType = await removeFromCart(id).unwrap();

      if (res?.success) {
        dispatch(setCart(res?.data));
      }
    } catch (err: any) {
      swal(err?.message, "", "error");
    }
  };

  return (
    <>
      {isLoading ? (
        <div
          style={{ borderBottom: "1px solid lightgray" }}
          className="d-flex
        flex-column flex-lg-row me-2 text-dark p-2 rounded-3 mb-1 justify-content-around align-items-center"
        >
          <div>
            <svg
              className="bd-placeholder-img card-img-top rounded-3"
              width="100%"
              height="130"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#868e96"></rect>
            </svg>
          </div>
          <div
            style={{ width: "70%" }}
            className="mt-2 mt-lg-0 d-flex d-md-block flex-column justify-content-center text-center"
          >
            <h5 className="card-title placeholder-glow ">
              <span className="placeholder col-8"></span>
            </h5>
            <p className="card-text placeholder-glow m-0">
              <span className="placeholder col-4"></span>
            </p>
            <p className="card-text placeholder-glow m-0">
              <span className="placeholder col-6"></span>
            </p>
            <p className="card-text placeholder-glow m-0">
              <span className="placeholder col-3"></span>
            </p>
            <a
              href="#"
              className="btn btn-danger disabled placeholder col-8 col-md-3 mx-auto mt-2"
            ></a>
          </div>
        </div>
      ) : (
        <div
          style={{ borderBottom: "1px solid lightgray" }}
          className="d-flex
        flex-column flex-lg-row me-2 text-dark p-2 rounded-3 mb-1 justify-content-around align-items-center"
        >
          <div>
            <img
              className="img-fluid rounded-3"
              src={course?.thumbnailLink}
              alt=""
              style={{ height: 130 }}
            />
          </div>
          <div
            style={{ width: "70%" }}
            className="mt-2 mt-lg-0 d-flex d-md-block flex-column justify-content-center text-center"
          >
            <h6 className="m-0">{course?.title}</h6>
            <small>{course?.instructorName}</small>
            <div className="d-flex justify-content-center mt-1">
              {course.avgRating !== 0 && (
                <span className="me-1 rating">
                  {course.avgRating.toFixed(1)}
                </span>
              )}
              <Rating
                className="me-1"
                initialRating={course.avgRating}
                emptySymbol={
                  <FontAwesomeIcon icon={faStar} color="whitesmoke" />
                }
                fullSymbol={<FontAwesomeIcon icon={faStar} color="gold" />}
                readonly
              ></Rating>
              {course.ratingCount !== 0 && (
                <small>({course.ratingCount})</small>
              )}
            </div>
            <div className="d-flex justify-content-center mt-2">
              <h5 className="fw-bold">${course?.price}</h5>
            </div>
            <button
              onClick={handleRemoveFromCart}
              className="btn btn-outline-danger"
            >
              Remove <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartReviewItem;
