// Imports
import RootLayout from "@/components/Layouts/RootLayout";
import type { ReactElement } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import CartReviewItem from "@/components/ui/cart/CartReviewItem";
import Cart from "../components/ui/cart/Cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { useCreatePaymentIntentMutation } from "@/redux/api/purchaseApi";
import { setClientSecret } from "@/redux/slices/userSlice";
import swal from "sweetalert";
import { useState } from "react";

const CartReviewPage = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const router = useRouter();

  const [checkoutLoading, setCheckoutLoading] = useState<boolean>(false);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const res = await createPaymentIntent({}).unwrap();
      if (res?.success) {
        dispatch(setClientSecret(res.data.clientSecret));
        router.push("/payment");
        setCheckoutLoading(false);
      }
    } catch (err: any) {
      setCheckoutLoading(false);
      swal("Something went wrong", "", "error");
    }
  };

  return (
    <div className="container my-5">
      {cart && cart.courses.length ? (
        <div className="row g-5 mt-3">
          <div className="col-lg-8">
            <p className="text-center bg-dark text-white p-2 rounded-3">
              You added the following courses
              <FontAwesomeIcon className="mx-1" icon={faShoppingBag} />
            </p>
            {cart.courses.map((id) => (
              <CartReviewItem key={id} id={id} />
            ))}
          </div>

          <div className="col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-dark">Your cart</span>
              <span className="badge bg-dark rounded-pill">
                {cart?.courses?.length}
              </span>
            </h4>

            <Cart cart={cart} />

            <div className="card p-2">
              {checkoutLoading ? (
                <button className="btn btn-success" type="button" disabled>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Redirecting ...
                </button>
              ) : (
                <button onClick={handleCheckout} className="btn btn-success">
                  Checkout <FontAwesomeIcon icon={faAngleDoubleRight} />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid my-5 mx-auto">
          <div className="row">
            <div className="col-md-12">
              <div className="shadow-sm p-4 rounded-3">
                <div className="card-body cart">
                  <div className="col-sm-12 empty-cart-cls text-center">
                    <img
                      src="/EmptyCart.svg"
                      className="img-fluid mb-4 mr-3 col-6 col-lg-3"
                      alt=""
                    />
                    <h3 className="fw-light">Your Cart is Empty</h3>
                    <p className="m-0">Add a course to continue</p>
                    <button
                      className="btn btn-outline-success mt-3"
                      data-abc="true"
                      onClick={() => router.push("/courses")}
                    >
                      Browse Courses
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartReviewPage;

CartReviewPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout onlyStudentAccess={true}>
      <RootLayout>{page}</RootLayout>
    </AuthLayout>
  );
};
