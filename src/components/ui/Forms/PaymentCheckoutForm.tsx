// Imports
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import swal from "sweetalert";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { usePurchaseCoursesMutation } from "@/redux/api/purchaseApi";
import LoadingSpinner from "../LoadingSpinner";
import { setCart } from "@/redux/slices/cartSlice";
import Form from "@/components/ui/Forms/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/ui/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { getUserFullName } from "@/utils/common";
import { PaymentSchema } from "@/schemas/payment";

const PaymentCheckoutForm = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const { clientSecret } = useAppSelector((state) => state.user);
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [purchaseCourses] = usePurchaseCoursesMutation();

  const stripe = useStripe();
  const elements = useElements();

  // States
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form default values
  const defaultValues = {
    name: getUserFullName(currentUser),
    email: currentUser?.email || "",
  };

  const router = useRouter();

  const handlePurchaseCourses = async () => {
    setIsLoading(true);
    try {
      const res = await purchaseCourses({}).unwrap();
      if (res.success) {
        dispatch(setCart(null));
        router.push("/purchase-confirm");
      }
      setIsLoading(false);
    } catch (err: any) {
      swal(err?.message, "", "error");
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    setProcessing(true);
    // Use your card Element with other Stripe.js APIs
    const { error: paymentCreatingError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentCreatingError) {
      setError(paymentCreatingError.message as string);
      swal(paymentCreatingError.message as string, "", "error");
      setSuccess("");
    } else {
      setError("");
      console.log("[PaymentMethod]", paymentMethod);
    }

    //Payment intent
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: data.name,
            email: data.email,
          },
        },
      });

    if (paymentIntent) {
      if (intentError) {
        setError("Something went wrong!");
        setSuccess("");
        swal("Something went wrong!", "", "error");
      } else {
        setError("");
        setSuccess("Payment processed successfully");
        swal("Payment processed successfully", "", "success");

        // Save to DB when creating invoice feature
        const payment = {
          courses: cart && cart.courses,
          amount: paymentIntent?.amount,
          created: paymentIntent?.created,
          last4: paymentMethod?.card?.last4,
          transaction: paymentIntent?.client_secret?.slice(
            "_secret" as unknown as number
          )[0],
        };

        await handlePurchaseCourses();
      }
    }
  };

  return (
    <>
      {currentUser && cart && !isLoading ? (
        <div className="row shadow-lg rounded-3 col-lg-8 mx-auto p-4">
          <div className="mb-4">
            <h2 className="fw-light">Provide Personal Details</h2>{" "}
            <span>
              Please provide your details in order to confirm subscription of
              courses.
            </span>
          </div>
          <div>
            <Form
              submitHandler={onSubmit}
              resolver={zodResolver(PaymentSchema.course)}
              defaultValues={defaultValues}
            >
              <h6 className="text-uppercase text-start">User Information</h6>
              <div className="mb-3">
                <FormInput name="name" type="text" label="Name" required />
              </div>
              <div className="mb-3">
                <FormInput name="email" type="email" label="Email" required />
              </div>
              <div className="my-4">
                <h6 className="text-uppercase text-start">Billing Address</h6>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <FormInput
                        name="country"
                        type="text"
                        label="Country"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <div className="mb-3">
                        <FormInput
                          name="city"
                          type="text"
                          label="City"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 mb-3">
                  <h6 className="text-uppercase mb-4 text-start">
                    Payment Information
                  </h6>
                  <span className="d-flex justify-content-between">
                    <small>
                      <b>Testing Card</b> : 4242424242424242
                    </small>
                    <small>
                      <b>Testing Info</b> : 04/50 123 45678
                    </small>
                  </span>
                  <div className="row mt-2">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                              color: "#aab7c4",
                            },
                          },
                          invalid: {
                            color: "#9e2146",
                          },
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="mt-4 mb-4 d-flex justify-content-between">
                  <button
                    onClick={() => router.back()}
                    className="btn btn-secondary px-3"
                  >
                    <FontAwesomeIcon icon={faBackward} /> Previous
                  </button>
                  {processing && error.length <= 0 ? (
                    <button className="btn btn-success" type="button" disabled>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!stripe || success.length > 0 ? true : false}
                      className="btn btn-success px-3"
                    >
                      Pay ${cart.payment.grandTotal}
                    </button>
                  )}
                </div>
              </div>
            </Form>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default PaymentCheckoutForm;
