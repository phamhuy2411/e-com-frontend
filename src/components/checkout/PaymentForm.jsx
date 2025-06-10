import { Skeleton } from '@mui/material';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { memo } from 'react';

const PaymentForm = memo(({ clientSecret, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsSubmitting(true);
    try {
      await elements.submit();

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${import.meta.env.VITE_FRONTEND_URL}/order-confirm`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
        return false;
      }
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred during payment processing');
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  const isLoading = !clientSecret || !stripe || !elements;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
      {isLoading ? (
        <Skeleton variant="rectangular" height={200} />
      ) : (
        <>
          {clientSecret && <PaymentElement options={paymentElementOptions} />}
          {errorMessage && (
            <div className="text-red-500 mt-2" role="alert">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="text-white w-full px-5 py-[10px] bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
            disabled={!stripe || isLoading || isSubmitting}
            aria-label={`Pay $${Number(totalPrice).toFixed(2)}`}
          >
            {!isLoading && !isSubmitting
              ? `Pay $${Number(totalPrice).toFixed(2)}`
              : 'Processing'}
          </button>
        </>
      )}
    </form>
  );
});

PaymentForm.propTypes = {
  clientSecret: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

PaymentForm.displayName = 'PaymentForm';

export default PaymentForm;