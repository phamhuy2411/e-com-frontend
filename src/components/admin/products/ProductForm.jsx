import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import { fetchAdminBrandsByCategory, clearBrands } from '../../../store/actions/adminActions';

const ProductForm = memo(({ product, categories, brands, onSubmit, onCancel, isLoading }) => {
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoadingBrands, setIsLoadingBrands] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm();

    const selectedCategoryId = watch('categoryId');

    useEffect(() => {
        if (product) {
            reset({
                productName: product.productName || '',
                productDescription: product.description || product.productDescription || '',
                productPrice: product.price || product.productPrice || '',
                productQuantity: product.quantity || product.productQuantity || '',
                categoryId: product.category?.categoryId || product.categoryId || '',
                brandId: product.brand?.brandId || product.brandId || '',
                discount: typeof product.discount !== 'undefined' ? product.discount : '',
            });
            
            // Set image preview for existing product
            if (product.image || product.productImage) {
                setImagePreview(product.image || product.productImage);
            }
            
            // If editing a product, fetch brands for its category
            if (product.category?.categoryName || product.categoryName) {
                dispatch(fetchAdminBrandsByCategory(product.category?.categoryName || product.categoryName));
            }
        } else {
            // Reset image preview when creating new product
            setImagePreview(null);
            setSelectedImage(null);
        }
    }, [product, reset, dispatch]);

    // Sau khi brands thay đổi, nếu đang edit thì set lại brandId đúng với product
    useEffect(() => {
        if (product && brands && brands.length > 0) {
            const brandId = product.brand?.brandId || product.brandId || '';
            if (brandId) {
                setValue('brandId', String(brandId));
            }
        }
    }, [brands, product, setValue]);

    // Fetch brands when category changes
    useEffect(() => {
        console.log('Category changed to:', selectedCategoryId);
        if (selectedCategoryId) {
            // So sánh categoryId về cùng kiểu string để tránh lỗi
            const selectedCategory = categories?.find(cat => String(cat.categoryId) === String(selectedCategoryId));
            console.log('Selected category:', selectedCategory);
            if (selectedCategory) {
                console.log('Fetching brands for category:', selectedCategory.categoryName);
                setIsLoadingBrands(true);
                dispatch(fetchAdminBrandsByCategory(selectedCategory.categoryName));
                // Reset brand selection khi đổi category
                setValue('brandId', '');
            }
        } else {
            // Nếu không chọn category, clear brands
            console.log('No category selected, clearing brands');
            setIsLoadingBrands(false);
            dispatch(clearBrands());
            setValue('brandId', '');
        }
    }, [selectedCategoryId, categories, dispatch, setValue]);

    // Debug brands
    useEffect(() => {
        console.log('=== BRANDS DEBUG ===');
        console.log('Brands updated:', brands);
        console.log('Brands type:', typeof brands);
        console.log('Brands is array:', Array.isArray(brands));
        console.log('Brands length:', brands ? brands.length : 'null/undefined');
        console.log('Selected category ID:', selectedCategoryId);
        console.log('Is loading brands:', isLoadingBrands);
        console.log('===================');
        
        if (brands !== null) {
            setIsLoadingBrands(false);
        }
    }, [brands, selectedCategoryId, isLoadingBrands]);

    // Load brands based on initial product data or show empty state
    useEffect(() => {
        if (product && product.category?.categoryName) {
            // If editing a product, fetch brands for its category
            console.log('Loading brands for existing product category:', product.category.categoryName);
            setIsLoadingBrands(true);
            dispatch(fetchAdminBrandsByCategory(product.category.categoryName));
        } else if (!product) {
            // If creating new product, clear brands initially
            console.log('Creating new product - clearing brands initially');
            setIsLoadingBrands(false);
            dispatch(clearBrands());
        }
    }, [product, dispatch]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Kiểm tra loại file
            const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                alert('Chỉ chấp nhận file JPG, PNG, GIF!');
                return;
            }
            // Kiểm tra kích thước file
            if (file.size > 10 * 1024 * 1024) {
                alert('File ảnh phải nhỏ hơn 10MB!');
                return;
            }
            setSelectedImage(file);
            // Tạo preview URL
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFormSubmit = (data) => {
        const formData = {
            ...data,
            imageFile: selectedImage
        };
        formData.description = data.productDescription;
        formData.price = data.productPrice;
        formData.quantity = data.productQuantity;
        if (formData.discount === '') formData.discount = 0;
        else formData.discount = Number(formData.discount);
        onSubmit(formData);
    };

    const removeImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        // Reset file input
        const fileInput = document.getElementById('productImage');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
                {/* Basic Information Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                        Basic Information
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">
                                Product Name *
                            </label>
                            <input
                                type="text"
                                id="productName"
                                {...register('productName', { 
                                    required: 'Product name is required',
                                    minLength: {
                                        value: 2,
                                        message: 'Product name must be at least 2 characters'
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: 'Product name must be at most 100 characters'
                                    }
                                })}
                                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                                    errors.productName ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                }`}
                                placeholder="Enter product name"
                            />
                            {errors.productName && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <FiX className="w-4 h-4 mr-1" />
                                    {errors.productName.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                id="categoryId"
                                {...register('categoryId', { 
                                    required: 'Category is required'
                                })}
                                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                                    errors.categoryId ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                }`}
                            >
                                <option value="">Select a category</option>
                                {categories?.map((category) => (
                                    <option key={category.categoryId} value={category.categoryId}>
                                        {category.categoryName}
                                    </option>
                                ))}
                            </select>
                            {errors.categoryId && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <FiX className="w-4 h-4 mr-1" />
                                    {errors.categoryId.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-2">
                                Price *
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="number"
                                    id="productPrice"
                                    step="0.01"
                                    min="0.01"
                                    max="1000000"
                                    {...register('productPrice', { 
                                        required: 'Price is required',
                                        min: {
                                            value: 0.01,
                                            message: 'Price must be greater than 0'
                                        },
                                        max: {
                                            value: 1000000,
                                            message: 'Price must be less than or equal to 1,000,000'
                                        }
                                    })}
                                    className={`w-full pl-8 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                                        errors.productPrice ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                    placeholder="0.00"
                                />
                            </div>
                            {errors.productPrice && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <FiX className="w-4 h-4 mr-1" />
                                    {errors.productPrice.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="productQuantity" className="block text-sm font-medium text-gray-700 mb-2">
                                Quantity *
                            </label>
                            <input
                                type="number"
                                id="productQuantity"
                                min="0"
                                max="10000"
                                {...register('productQuantity', { 
                                    required: 'Quantity is required',
                                    min: {
                                        value: 0,
                                        message: 'Quantity must be greater than or equal to 0'
                                    },
                                    max: {
                                        value: 10000,
                                        message: 'Quantity must be less than or equal to 10,000'
                                    }
                                })}
                                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                                    errors.productQuantity ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                }`}
                                placeholder="0"
                            />
                            {errors.productQuantity && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <FiX className="w-4 h-4 mr-1" />
                                    {errors.productQuantity.message}
                                </p>
                            )}
                        </div>

                        <div className="lg:col-span-2">
                            <label htmlFor="brandId" className="block text-sm font-medium text-gray-700 mb-2">
                                Brand * {brands && (
                                    <span className="text-sm font-normal text-gray-500 ml-2">
                                        ({brands.length} brands available)
                                    </span>
                                )}
                            </label>
                            <select
                                id="brandId"
                                {...register('brandId', { 
                                    required: 'Brand is required'
                                })}
                                disabled={isLoadingBrands}
                                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                                    errors.brandId ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                } ${isLoadingBrands ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                            >
                                <option value="">
                                    {isLoadingBrands ? 'Loading brands...' : 'Select a brand'}
                                </option>
                                {brands?.map((brand) => (
                                    <option key={brand.brandId} value={brand.brandId}>
                                        {brand.brandName}
                                    </option>
                                ))}
                            </select>
                            {errors.brandId && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <FiX className="w-4 h-4 mr-1" />
                                    {errors.brandId.message}
                                </p>
                            )}
                            {isLoadingBrands && (
                                <p className="mt-2 text-sm text-blue-600 flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                                    Loading brands...
                                </p>
                            )}
                            {!isLoadingBrands && selectedCategoryId && brands && brands.length === 0 && (
                                <p className="mt-2 text-sm text-yellow-600 flex items-center">
                                    <FiX className="w-4 h-4 mr-1" />
                                    No brands available for this category
                                </p>
                            )}
                            {!isLoadingBrands && !selectedCategoryId && (
                                <p className="mt-2 text-sm text-gray-500 flex items-center">
                                    <FiImage className="w-4 h-4 mr-1" />
                                    Please select a category to see available brands
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-2">
                                Discount (%)
                            </label>
                            <input
                                type="number"
                                id="discount"
                                step="0.01"
                                min="0"
                                max="100"
                                {...register('discount', {
                                    min: { value: 0, message: 'Discount must be at least 0%' },
                                    max: { value: 100, message: 'Discount must be at most 100%' },
                                    validate: value => value === '' || !isNaN(Number(value)) || 'Discount must be a number'
                                })}
                                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${errors.discount ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}
                                placeholder="0"
                            />
                            {errors.discount && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <FiX className="w-4 h-4 mr-1" />
                                    {errors.discount.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Product Image Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        Product Image
                    </h3>
                    
                    <div className="space-y-6">
                        {/* Image Preview */}
                        {imagePreview && (
                            <div className="flex items-start space-x-4">
                                <div className="relative">
                                    <img
                                        src={imagePreview}
                                        alt="Product preview"
                                        className="h-40 w-40 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                                        title="Remove image"
                                    >
                                        <FiX size={14} />
                                    </button>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600">
                                        {product ? 'Current product image. Upload a new image to replace it.' : 'Selected image preview.'}
                                    </p>
                                </div>
                            </div>
                        )}
                        
                        {/* File Upload Area */}
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
                            <div className="space-y-4">
                                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                                <div>
                                    <label htmlFor="productImage" className="cursor-pointer">
                                        <span className="text-lg font-medium text-gray-900 hover:text-orange-600 transition-colors">
                                            {imagePreview ? 'Change Image' : 'Upload Product Image'}
                                        </span>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {product ? 'Click to upload a new image' : 'Click to upload an image (optional)'}
                                        </p>
                                    </label>
                                    <input
                                        type="file"
                                        id="productImage"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </div>
                                <p className="text-xs text-gray-400">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        Product Description
                    </h3>
                    
                    <div>
                        <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            id="productDescription"
                            {...register('productDescription', {
                                required: 'Description is required',
                                minLength: {
                                    value: 10,
                                    message: 'Description must be at least 10 characters'
                                },
                                maxLength: {
                                    value: 2000,
                                    message: 'Description must be at most 2000 characters'
                                }
                            })}
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors hover:border-gray-400 resize-none"
                            placeholder="Enter detailed product description (optional)"
                        />
                        {errors.productDescription && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <FiX className="w-4 h-4 mr-1" />
                                {errors.productDescription.message}
                            </p>
                        )}
                        <p className="mt-2 text-sm text-gray-500">
                            Provide detailed information about the product features, specifications, and benefits.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-3 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? (
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Saving...
                            </div>
                        ) : (
                            product ? 'Update Product' : 'Create Product'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
});

ProductForm.propTypes = {
    product: PropTypes.object,
    categories: PropTypes.array,
    brands: PropTypes.array,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

ProductForm.displayName = 'ProductForm';

export default ProductForm; 