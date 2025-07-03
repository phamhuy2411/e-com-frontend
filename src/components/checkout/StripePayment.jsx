import { Skeleton } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaymentForm from './PaymentForm';
import { createStripePaymentSecret } from '../../store/actions';
import { memo } from 'react';

const stripeApiKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeApiKey ? loadStripe(stripeApiKey) : null;

const StripePayment = memo(() => {
  const dispatch = useDispatch();
  const { clientSecret } = useSelector((state) => state.auth);
  const { totalPrice } = useSelector((state) => state.carts);
  const { isLoading } = useSelector((state) => state.errors);

  useEffect(() => {
    if (!clientSecret) {
      dispatch(createStripePaymentSecret(totalPrice));
    }
  }, [clientSecret, dispatch, totalPrice]);

  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto">
        <Skeleton variant="rectangular" height={400} />
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="max-w-lg mx-auto">
        <Skeleton variant="rectangular" height={400} />
      </div>
    );
  }

  if (!stripeApiKey) {
    return (
      <div className="max-w-lg mx-auto text-center text-red-600 font-semibold py-10">
        Stripe API key is missing. Please set VITE_STRIPE_PUBLISHABLE_KEY in your environment variables.
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
    </Elements>
  );
});

StripePayment.displayName = 'StripePayment';

export default StripePayment;