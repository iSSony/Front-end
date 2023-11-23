// Imports
import { useCourseQuery } from "@/redux/api/courseApi";
import { ICourse } from "@/types";

const CartList = ({ id }: { id: string }) => {
  const { data, isLoading } = useCourseQuery(id);
  const course = data?.data as ICourse;

  return (
    <>
      {isLoading ? (
        <div className="placeholder-glow ">
          <li className="placeholder list-group-item d-flex justify-content-between lh-sm">
            <span className="placeholder col-6"></span>
          </li>
        </div>
      ) : (
        <li
          key={course._id}
          className="list-group-item d-flex justify-content-between lh-sm"
        >
          <div>
            <p className="my-0">
              <small>{course.title}</small>
            </p>
          </div>
          <span className="text-muted ms-4">${course.price}</span>
        </li>
      )}
    </>
  );
};

export default CartList;
