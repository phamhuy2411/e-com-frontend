import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { stripePaymentConfirmation } from '../../store/actions';
import toast from 'react-hot-toast';
import { memo } from 'react';

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-4" />
    <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
    <div className="h-4 bg-gray-200 rounded w-full mx-auto mb-2" />
    <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto" />
  </div>
);

const PaymentConfirmation = memo(() => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const { cart } = useSelector((state) => state.carts);
  const [loading, setLoading] = useState(false);

  const paymentIntent = searchParams.get('payment_intent');
  const clientSecret = searchParams.get('payment_intent_client_secret');
  const redirectStatus = searchParams.get('redirect_status');
  const selectedUserCheckoutAddress = localStorage.getItem('CHECKOUT_ADDRESS')
    ? JSON.parse(localStorage.getItem('CHECKOUT_ADDRESS'))
    : [];

  useEffect(() => {
    if (
      paymentIntent &&
      clientSecret &&
      redirectStatus &&
      cart &&
      cart?.length > 0
    ) {
      const sendData = {
        addressId: selectedUserCheckoutAddress.addressId,
        pgName: 'Stripe',
        pgPaymentId: paymentIntent,
        pgStatus: 'succeeded',
        pgResponseMessage: 'Payment successful',
      };

      dispatch(stripePaymentConfirmation(sendData, setErrorMessage, setLoading, toast));
    }
  }, [paymentIntent, clientSecret, redirectStatus, cart, dispatch, selectedUserCheckoutAddress.addressId]);

  if (errorMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto border border-red-200">
          <div className="text-red-500 mb-4 flex justify-center">
            <FaCheckCircle size={64} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Failed</h2>
          <p className="text-gray-600 mb-6">{errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading ? (
        <div className="max-w-xl mx-auto">
          <LoadingSkeleton />
        </div>
      ) : (
        <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto border border-gray-200">
          <div className="text-green-500 mb-4 flex justify-center">
            <FaCheckCircle size={64} aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase! Your payment was successful, and we&apos;re processing your order.
          </p>
        </div>
      )}
    </div>
  );
});

PaymentConfirmation.displayName = 'PaymentConfirmation';

export default PaymentConfirmation;