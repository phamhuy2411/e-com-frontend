import { FaExclamationTriangle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { memo } from 'react';

const ErrorPage = memo(({ message }) => {
  return (
    <div 
      className="flex flex-col items-center justify-center px-6 py-14"
      role="alert"
      aria-live="polite"
    >
      <FaExclamationTriangle 
        className="text-red-500 text-6xl mb-4"
        aria-hidden="true"
      />
      <p className="text-gray-600 mb-6 text-center">
        {message || "An unexpected error has occurred"}
      </p>
    </div>
  );
});

ErrorPage.propTypes = {
  message: PropTypes.string,
};

ErrorPage.defaultProps = {
  message: "An unexpected error has occurred",
};

ErrorPage.displayName = 'ErrorPage';

export default ErrorPage;