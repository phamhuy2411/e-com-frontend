import { memo } from 'react';
import { Navigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import { useAdminAuth } from '../../hooks/useAdminAuth';

const AdminLoginRoute = memo(() => {
    const { hasAdminAccess } = useAdminAuth();
    
    // If user is already an admin, redirect to admin dashboard
    if (hasAdminAccess) {
        return <Navigate to="/admin" replace />;
    }
    
    // Always show admin login form if not an admin, regardless of client user login state
    return <AdminLogin />;
});

AdminLoginRoute.displayName = 'AdminLoginRoute';

export default AdminLoginRoute; 