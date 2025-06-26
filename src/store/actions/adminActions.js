import adminApi from "../../api/adminApi";

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

export const createAdminProduct = (categoryId, productData, toast, reset, setOpenModal) => async (dispatch) => {
    try {
        dispatch({ type: "ADMIN_BUTTON_LOADER" });
        const { data } = await adminApi.createProduct(categoryId, productData);
        if (data) {
            dispatch(fetchAdminProducts());
            if (toast) toast.success("Product created successfully");
            if (reset) reset();
            if (setOpenModal) setOpenModal(false);
        }
        dispatch({ type: "ADMIN_SUCCESS" });
    } catch (error) {
        if (toast) toast.error(error?.response?.data?.message || "Failed to create product");
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
        if (toast) toast.error(error?.response?.data?.message || "Failed to update product");
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
        if (toast) toast.error(error?.response?.data?.message || "Failed to delete product");
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