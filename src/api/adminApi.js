import api from "./api";

// Category APIs
export const adminApi = {
    // Category Management
    getAllCategories: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return api.get(`/public/categories?${queryString}`);
    },

    createCategory: (categoryData) => {
        return api.post("/public/categories", categoryData);
    },

    updateCategory: (categoryId, categoryData) => {
        return api.put(`/public/categories/${categoryId}`, categoryData);
    },

    deleteCategory: (categoryId) => {
        return api.delete(`/admin/categories/${categoryId}`);
    },

    // Brand Management
    getAllBrands: () => {
        return api.get("/public/brands");
    },

    getBrandsByCategory: (categoryName) => {
        return api.get(`/public/categories/${categoryName}/brands`);
    },

    // Product Management
    getAllProducts: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return api.get(`/public/products?${queryString}`);
    },

    getProductById: (productId) => {
        return api.get(`/public/products/${productId}`);
    },

    createProduct: (categoryId, brandId, productData) => {
        return api.post(`/admin/categories/${categoryId}/brands/${brandId}/product`, productData);
    },

    updateProduct: (productId, productData) => {
        return api.put(`/admin/products/${productId}`, productData);
    },

    deleteProduct: (productId) => {
        return api.delete(`/admin/products/${productId}`);
    },

    updateProductImage: (productId, imageFile) => {
        const formData = new FormData();
        formData.append("image", imageFile);
        return api.put(`/products/${productId}/image`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    // Get products by category
    getProductsByCategory: (categoryId, params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return api.get(`/public/categories/${categoryId}/products?${queryString}`);
    },

    // Search products by keyword
    searchProductsByKeyword: (keyword, params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return api.get(`/public/products/keyword/${keyword}?${queryString}`);
    },
};

export default adminApi; 