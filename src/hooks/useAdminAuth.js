import { useSelector } from 'react-redux';

export const useAdminAuth = () => {
    const { user } = useSelector((state) => state.auth);
    
    const isAuthenticated = !!user;
    
    // Kiểm tra role admin dựa trên cấu trúc response từ backend
    // Backend trả về roles dưới dạng List<String> từ userDetails.getAuthorities()
    const isAdmin = user && (
        user.roles?.includes('ROLE_ADMIN') || 
        user.role === 'ROLE_ADMIN' ||
        user.authorities?.some(auth => auth.authority === 'ROLE_ADMIN') ||
        user.isAdmin === true ||
        // Thêm kiểm tra fallback cho các format khác
        (Array.isArray(user.roles) && user.roles.some(role => 
            role.includes('ADMIN') || role === 'ADMIN' || role === 'admin'
        )) ||
        // Kiểm tra nếu roles là string
        (typeof user.roles === 'string' && (
            user.roles.includes('ADMIN') || user.roles === 'ADMIN' || user.roles === 'admin'
        ))
    );
    
    return {
        user,
        isAuthenticated,
        isAdmin,
        hasAdminAccess: isAuthenticated && isAdmin
    };
}; 