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
        console.log('Fetching brands for category:', categoryName);
        const encodedCategoryName = encodeURIComponent(categoryName);
        const url = `/public/categories/${encodedCategoryName}/brands`;
        console.log('API URL:', url);
        return api.get(url);
    },

    createBrand: (categoryId, brandData) => {
        return api.post(`/categories/${categoryId}/brand`, brandData);
    },

    updateBrand: (brandId, brandData) => {
        return api.put(`/admin/brands/${brandId}`, brandData);
    },

    deleteBrand: (brandId) => {
        return api.delete(`/admin/brands/${brandId}`);
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
        console.log('adminApi.createProduct called with:', { categoryId, brandId, productData });
        return api.post(`/admin/categories/${categoryId}/brands/${brandId}/product`, productData);
    },

    updateProduct: (categoryId, brandId, productId, productData) => {
        return api.put(`/admin/categories/${categoryId}/brands/${brandId}/products/${productId}`, productData);
    },

    deleteProduct: (productId) => {
        return api.delete(`/admin/products/${productId}`);
    },

    updateProductImage: (productId, imageFile) => {
        const formData = new FormData();
        formData.append("image", imageFile);
        return api.put(`/products/${productId}/image`, formData);
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