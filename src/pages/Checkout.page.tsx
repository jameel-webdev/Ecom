import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51OEAGkSBerZgP2Lejn5vEMje7Tx9d9GyO4xZM2isFOduRbiB1IfkZlaeK8t53t7mWj44ugeEPkh5j2dbxcrFWf2M00duHxDnlv"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessing(true);
    const orderData = {};
    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (error) {
      setIsProcessing(false);
      return toast.error(error.message || "Server Busy! Try after sometime!");
    }
    if (paymentIntent.status === "succeeded") {
      console.log("Payment Successfull");
      toast.success("Payment Successfull");
      navigate("/orders");
    }
    setIsProcessing(false);
  };
  return (
    <div className="checkout-container">
      <form onSubmit={submitHandler}>
        <PaymentElement />
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};
const Checkout = () => {
  const location = useLocation();
  const clientSecret: string | undefined = location.state;

  if (!clientSecret) {
    return <Navigate to={"/shipping"} />;
  }
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
