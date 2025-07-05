import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SuccessMessage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white py-10">
      <div className="flex flex-col items-center">
        <FaCheckCircle size={80} className="text-orange-500 mb-4" aria-hidden="true" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Thank you for your purchase! Your order has been placed and is being processed. You will receive an email confirmation shortly.
        </p>
        <button
          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-white rounded-xl font-semibold text-lg shadow transition-all duration-200"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
