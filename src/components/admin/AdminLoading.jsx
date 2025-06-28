import { memo } from 'react';
import { FiShield } from 'react-icons/fi';

const AdminLoading = memo(() => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center animate-pulse">
                        <FiShield className="text-orange-600" size={32} />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Verifying Access
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Please wait while we verify your administrator privileges...
                </p>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                    </div>
                </div>
            </div>
        </div>
    );
});

AdminLoading.displayName = 'AdminLoading';

export default AdminLoading; 