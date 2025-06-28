import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
    withCredentials: true,
});

// Response interceptor để xử lý lỗi authentication
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Chỉ redirect nếu đang ở trang admin và không phải đang thực hiện action quan trọng
            const isAdminPage = window.location.pathname.startsWith('/admin');
            const isLoginPage = window.location.pathname === '/admin/login';
            const isClientLoginPage = window.location.pathname === '/login';
            
            // Không redirect nếu đã ở trang login
            if (isAdminPage && !isLoginPage) {
                // Thêm delay nhỏ để tránh redirect quá nhanh và cho phép error handling
                setTimeout(() => {
                    // Kiểm tra lại trước khi redirect
                    if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
                        window.location.href = "/admin/login";
                    }
                }, 500);
            } else if (!isAdminPage && !isClientLoginPage) {
                setTimeout(() => {
                    if (!window.location.pathname.startsWith('/admin') && window.location.pathname !== '/login') {
                        window.location.href = "/login";
                    }
                }, 500);
            }
        }
        return Promise.reject(error);
    }
);

export default api;