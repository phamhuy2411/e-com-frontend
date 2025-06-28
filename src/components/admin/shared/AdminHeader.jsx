import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { FiLogOut, FiUser, FiBell } from 'react-icons/fi';
import { logOutUser } from '../../../store/actions';
import { useAdminAuth } from '../../../hooks/useAdminAuth';

const AdminHeader = memo(() => {
    const dispatch = useDispatch();
    const { user } = useAdminAuth();

    const handleLogout = () => {
        dispatch(logOutUser());
    };

    const getUserDisplayName = () => {
        if (!user) return 'Admin User';
        return user.username || user.name || user.email || 'Admin User';
    };

    const getUserRole = () => {
        if (!user) return 'Administrator';
        if (user.roles?.includes('ROLE_ADMIN')) return 'Administrator';
        if (user.roles?.includes('ROLE_SELLER')) return 'Seller';
        if (user.roles?.includes('ROLE_USER')) return 'User';
        if (user.role === 'ROLE_ADMIN') return 'Administrator';
        if (user.role === 'ROLE_SELLER') return 'Seller';
        if (user.role === 'ROLE_USER') return 'User';
        if (user.authorities?.some(auth => auth.authority === 'ROLE_ADMIN')) return 'Administrator';
        if (user.isAdmin) return 'Administrator';
        return 'User';
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 fixed top-0 right-0 left-64 z-30">
            <div className="flex items-center justify-between h-full px-6">
                <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
                </div>
                
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <button className="p-2 text-gray-600 hover:text-orange-500 transition-colors duration-200">
                        <FiBell size={20} />
                    </button>
                    
                    {/* User Menu */}
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                <FiUser className="text-white" size={16} />
                            </div>
                            <div className="hidden md:block">
                                <p className="text-sm font-medium text-gray-800">
                                    {getUserDisplayName()}
                                </p>
                                <p className="text-xs text-gray-500">{getUserRole()}</p>
                            </div>
                        </div>
                        
                        <button
                            onClick={handleLogout}
                            className="p-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
                            title="Logout"
                        >
                            <FiLogOut size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
});

AdminHeader.displayName = 'AdminHeader';

export default AdminHeader; 