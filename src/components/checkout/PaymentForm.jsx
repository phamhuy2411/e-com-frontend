import { Skeleton } from '@mui/material';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderProductsAction } from '../../store/actions';
import { useNavigate } from 'react-router-dom';

const PaymentForm = memo(({ clientSecret, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);
  const { paymentMethod } = useSelector((state) => state.payment);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsSubmitting(true);
    try {
      await elements.submit();

      const { error, paymentIntent } = await stripe.confirmPayment({
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
      // Nếu thanh toán thành công, gọi orderProductsAction
      if (paymentIntent && paymentIntent.status === 'succeeded') {
        const orderRequestDTO = {
          addressId: selectedUserCheckoutAddress?.addressId,
          pgName: 'Stripe',
          pgPaymentId: paymentIntent.id,
          pgStatus: paymentIntent.status,
          pgResponseMessgage: paymentIntent.status,
        };
        await dispatch(orderProductsAction(paymentMethod, orderRequestDTO, null, navigate));
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