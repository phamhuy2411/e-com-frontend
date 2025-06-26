import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = memo(() => {
    const { user } = useSelector((state) => state.auth);
    
    // Check if user is logged in and has admin role
    // For now, we'll just check if user exists
    // You can add role-based check later when backend provides role information
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // TODO: Add role-based check when backend provides role information
    // if (user.role !== 'ADMIN') {
    //     return <Navigate to="/" replace />;
    // }

    return <Outlet />;
});

AdminRoute.displayName = 'AdminRoute';

export default AdminRoute; 