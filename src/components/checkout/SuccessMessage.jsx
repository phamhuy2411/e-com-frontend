import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SuccessMessage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8 bg-white rounded-xl shadow-lg mx-auto max-w-md mt-10 animate-fade-in">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="40" fill="#22c55e"/>
        <path d="M24 42L36 54L56 34" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <h2 className="text-3xl font-bold mt-4 mb-2 text-green-600">Đặt hàng thành công!</h2>
      <p className="text-gray-600 mb-6 text-center">
        Cảm ơn bạn đã mua hàng.<br />Đơn hàng của bạn sẽ được giao sớm nhất.
      </p>
      <Button
        variant="contained"
        color="success"
        size="large"
        className="rounded-xl px-8 py-2 text-lg shadow"
        onClick={() => navigate('/')}
      >
        Về trang chủ
      </Button>
    </div>
  );
};

export default SuccessMessage; 