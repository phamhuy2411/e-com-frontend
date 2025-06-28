import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft, FiShield } from 'react-icons/fi';

const ErrorPage = memo(({ 
    title = "Access Denied", 
    message = "You don't have permission to access this page.", 
    showHomeButton = true,
    showBackButton = true,
    icon: Icon = FiShield 
}) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                        <Icon className="text-red-600" size={32} />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    {title}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    {message}
                </p>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="flex flex-col space-y-3">
                        {showHomeButton && (
                            <Link
                                to="/"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
                            >
                                <FiHome className="mr-2" size={16} />
                                Go to Home
                            </Link>
                        )}
                        {showBackButton && (
                            <button
                                onClick={() => window.history.back()}
                                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
                            >
                                <FiArrowLeft className="mr-2" size={16} />
                                Go Back
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

ErrorPage.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    showHomeButton: PropTypes.bool,
    showBackButton: PropTypes.bool,
    icon: PropTypes.elementType,
};

ErrorPage.displayName = 'ErrorPage';

export default ErrorPage;