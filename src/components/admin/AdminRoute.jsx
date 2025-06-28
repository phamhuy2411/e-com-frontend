import { memo, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminLoading from './AdminLoading';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { getCurrentUser } from '../../store/actions';

const AdminRoute = memo(() => {
    const dispatch = useDispatch();
    const { isAuthenticated, hasAdminAccess, user } = useAdminAuth();
    
    // Fetch current user data if we have a user but no roles (incomplete data)
    useEffect(() => {
        if (isAuthenticated && user && !user.roles) {
            dispatch(getCurrentUser());
        }
    }, [isAuthenticated, user, dispatch]);
    
    // Kiểm tra thêm: nếu không có user data nhưng có token trong localStorage
    useEffect(() => {
        const authData = localStorage.getItem("auth");
        if (!user && authData) {
            try {
                const parsedAuth = JSON.parse(authData);
                if (parsedAuth && !parsedAuth.roles) {
                    dispatch(getCurrentUser());
                }
            } catch (error) {
                console.error("Error parsing auth data:", error);
            }
        }
    }, [user, dispatch]);
    
    // Show loading while fetching user data
    if (isAuthenticated && user && !user.roles) {
        return <AdminLoading />;
    }
    
    // Always redirect to admin login if not an admin, regardless of client user login state
    if (!hasAdminAccess) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
});

AdminRoute.displayName = 'AdminRoute';

export default AdminRoute; 