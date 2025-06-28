import adminApi from "../../api/adminApi";
import { getCurrentUser } from "./index";
import api from "../../api/api";

// Admin Authentication
export const authenticateAdminUser = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
        if (setLoader) setLoader(true);
        const { data } = await api.post("/auth/signin", sendData);
        
        // Kiểm tra xem user có role admin không
        const isAdmin = data.roles?.includes('ROLE_ADMIN') || 
                       data.role === 'ROLE_ADMIN' ||
                       data.authorities?.some(auth => auth.authority === 'ROLE_ADMIN') ||
                       data.isAdmin === true ||
                       (Array.isArray(data.roles) && data.roles.some(role => 
                           role.includes('ADMIN') || role === 'ADMIN' || role === 'admin'
                       )) ||
                       (typeof data.roles === 'string' && (
                           data.roles.includes('ADMIN') || data.roles === 'ADMIN' || data.roles === 'admin'
                       ));
        
        if (!isAdmin) {
            if (toast) toast.error("Access denied. Admin privileges required.");
            return;
        }
        
        // Lưu thông tin user (không bao gồm token vì token đã được lưu trong cookie)
        const userInfo = {
            id: data.id,
            username: data.username,
            roles: data.roles,
            // Không lưu token vì nó đã được lưu trong cookie tự động
        };
        
        dispatch({ type: "LOGIN_USER", payload: userInfo });
        
        try {
            localStorage.setItem("auth", JSON.stringify(userInfo));
        } catch {
            // ignore localStorage errors
        }
        
        if (reset) reset();
        if (toast) toast.success("Admin login successful");
        if (navigate) navigate("/admin");
    } catch (error) {
        if (toast) toast.error(error?.response?.data?.message || "Admin authentication failed");
    } finally {
        if (setLoader) setLoader(false);
    }
};

// Category Actions
export const fetchAdminCategories = (params = {}) => async (dispatch) => {
    try {
        dispatch({ type: "ADMIN_CATEGORY_LOADER" });
        const { data } = await adminApi.getAllCategories(params);
        if (data) {
            dispatch({
                type: "FETCH_ADMIN_CATEGORIES",
                payload: data.content,
                pageNumber: data.pageNumber,
                pageSize: data.pageSize,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                lastPage: data.lastPage,
            });
        }
        dispatch({ type: "ADMIN_SUCCESS" });
    } catch (error) {
        dispatch({
            type: "ADMIN_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch categories",
        });
    }
};

export const createAdminCategory = (categoryData, toast, reset, setOpenModal) => async (dispatch) => {
    try {
        dispatch({ type: "ADMIN_BUTTON_LOADER" });
        const { data } = await adminApi.createCategory(categoryData);
        if (data) {
            dispatch(fetchAdminCategories());
            if (toast) toast.success("Category created successfully");
            if (reset) reset();
            if (setOpenModal) setOpenModal(false);
        }
        dispatch({ type: "ADMIN_SUCCESS" });
    } catch (error) {
        if (toast) toast.error(error?.response?.data?.message || "Failed to create category");
        dispatch({ type: "ADMIN_ERROR", payload: null });
    }
};

export const updateAdminCategory = (categoryId, categoryData, toast, reset, setOpenModal) => async (dispatch) => {
    try {
        dispatch({ type: "ADMIN_BUTTON_LOADER" });
        const { data } = await adminApi.updateCategory(categoryId, categoryData);
        if (data) {
            dispatch(fetchAdminCategories());
            if (toast) toast.success("Category updated successfully");
            if (reset) reset();
            if (setOpenModal) setOpenModal(false);
        }
        dispatch({ type: "ADMIN_SUCCESS" });
    } catch (error) {
        if (toast) toast.error(error?.response?.data?.message || "Failed to update category");
        dispatch({ type: "ADMIN_ERROR", payload: null });
    }
};

export const deleteAdminCategory = (categoryId, toast, setOpenDeleteModal) => async (dispatch) => {
    try {
        dispatch({ type: "ADMIN_BUTTON_LOADER" });
        await adminApi.deleteCategory(categoryId);
        dispatch(fetchAdminCategories());
        if (toast) toast.success("Category deleted successfully");
        dispatch({ type: "ADMIN_SUCCESS" });
    } catch (error) {
        if (toast) toast.error(error?.response?.data?.message || "Failed to delete category");
        dispatch({ type: "ADMIN_ERROR", payload: null });
    } finally {
        if (setOpenDeleteModal) setOpenDeleteModal(false);
    }
};

// Brand Actions
export const fetchAdminBrands = () => async (dispatch) => {
    try {
        dispatch({ type: "ADMIN_CATEGORY_LOADER" });
        const { data } = await adminApi.getAllBrands();
        if (data) {
            dispatch({
                type: "FETCH_ADMIN_BRANDS",
                payload: data,
            });
        }
        dispatch({ type: "ADMIN_SUCCESS" });
    } catch (error) {
        dispatch({
            type: "ADMIN_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch brands",
        });
    }
};

export const fetchAdminBrandsByCategory = (categoryName) => async (dispatch) => {
    try {
        dispatch({ type: "ADMIN_CATEGORY_LOADER" });
        const { data } = await adminApi.getBrandsByCategory(categoryName);
        if (data) {
            dispatch({
                type: "FETCH_ADMIN_BRANDS",
                payload: data,
            });
        }
        dispatch({ type: "ADMIN_SUCCESS" });
    } catch (error) {
        dispatch({
            type: "ADMIN_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch brands",
        });
    }
};

// Product Actions
export const fetchAdminProducts = (params = {}) => async (dispatch) => {
    try {
        dispatch({ type: "ADMIN_PRODUCT_LOADER" });
        const { data } = await adminApi.getAllProducts(params);
        if (data) {
            dispatch({
                type: "FETCH_ADMIN_PRODUCTS",
                payload: data.content,
                pageNumber: data.pageNumber,
                pageSize: data.pageSize,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                lastPage: data.lastPage,
            });
        }
        dispatch({ type: "ADMIN_SUCCESS" });
    } catch (error) {
        dispatch({
            type: "ADMIN_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch products",
        });
    }
};

export const createAdminProduct = (categoryId, brandId, productData, toast, reset, setOpenModal) => async (dispatch) => {
    try {
        dispatch({ type: "ADMIN_BUTTON_LOADER" });
        const { data } = await adminApi.createProduct(categoryId, brandId, productData);
        if (data) {
            dispatch(fetchAdminProducts());
            if (toast) toast.success("Product created successfully");
            if (reset) reset();
            if (setOpenModal) setOpenModal(false);
        }
        dispatch({ type: "ADMIN_SUCCESS" });
    } catch (error) {
        // Kiểm tra nếu lỗi 401, thử refresh user data trước khi hiển thị lỗi
        if (error.response?.status === 401) {
            try {
                // Thử lấy lại user data
                await dispatch(getCurrentUser());
                // Nếu vẫn lỗi, hiển thị thông báo
                if (toast) toast.error("Session expired. Please login again.");
            } catch {
                if (toast) toast.error("Authentication failed. Please login again.");
            }
        } else {
            if (toast) toast.error(error?.response?.data?.message || "Failed to create product");
        }
        dispatch({ type: "ADMIN_ERROR", payload: null });
    }
};

export const updateAdminProduct = (productId, productData, toast, reset, setOpenModal) => async (dispatch) => {
    try {
        dispatch({ type: "ADMIN_BUTTON_LOADER" });
        const { data } = await adminApi.updateProduct(productId, productData);
        if (data) {
            dispatch(fetchAdminProducts());
            if (toast) toast.success("Product updated successfully");
            if (reset) reset();
            if (setOpenModal) setOpenModal(false);
        }
        dispatch({ type: "ADMIN_SUCCESS" });
    } catch (error) {
        // Kiểm tra nếu lỗi 401, thử refresh user data
        if (error.response?.status === 401) {
            try {
                await dispatch(getCurrentUser());
                if (toast) toast.error("Session expired. Please login again.");
            } catch {
                if (toast) toast.error("Authentication failed. Please login again.");
            }
        } else {
            if (toast) toast.error(error?.response?.data?.message || "Failed to update product");
        }
        dispatch({ type: "ADMIN_ERROR", payload: null });
    }
};

export const deleteAdminProduct = (productId, toast, setOpenDeleteModal) => async (dispatch) => {
    try {
        dispatch({ type: "ADMIN_BUTTON_LOADER" });
        await adminApi.deleteProduct(productId);
        dispatch(fetchAdminProducts());
        if (toast) toast.success("Product deleted successfully");
        dispatch({ type: "ADMIN_SUCCESS" });
    } catch (error) {
        // Kiểm tra nếu lỗi 401, thử refresh user data
        if (error.response?.status === 401) {
            try {
                await dispatch(getCurrentUser());
                if (toast) toast.error("Session expired. Please login again.");
            } catch {
                if (toast) toast.error("Authentication failed. Please login again.");
            }
        } else {
            if (toast) toast.error(error?.response?.data?.message || "Failed to delete product");
        }
        dispatch({ type: "ADMIN_ERROR", payload: null });
    } finally {
        if (setOpenDeleteModal) setOpenDeleteModal(false);
    }
};

export const updateAdminProductImage = (productId, imageFile, toast) => async (dispatch) => {
    try {
        dispatch({ type: "ADMIN_BUTTON_LOADER" });
        const { data } = await adminApi.updateProductImage(productId, imageFile);
        if (data) {
            dispatch(fetchAdminProducts());
            if (toast) toast.success("Product image updated successfully");
        }
        dispatch({ type: "ADMIN_SUCCESS" });
    } catch (error) {
        if (toast) toast.error(error?.response?.data?.message || "Failed to update product image");
        dispatch({ type: "ADMIN_ERROR", payload: null });
    }
};

// Clear admin state
export const clearAdminState = () => ({
    type: "CLEAR_ADMIN_STATE",
}); 