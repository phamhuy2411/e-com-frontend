import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchAdminBrandsByCategory, fetchAdminBrands } from '../../../store/actions/adminActions';

const ProductForm = memo(({ product, categories, brands, onSubmit, onCancel, isLoading }) => {
    const dispatch = useDispatch();
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
                productDescription: product.productDescription || '',
                productPrice: product.productPrice || '',
                productQuantity: product.productQuantity || '',
                categoryId: product.category?.categoryId || '',
                brandId: product.brand?.brandId || '',
            });
            
            // If editing a product, fetch brands for the selected category
            if (product.category?.categoryName) {
                dispatch(fetchAdminBrandsByCategory(product.category.categoryName));
            }
        }
    }, [product, reset, dispatch]);

    // Fetch brands when category changes
    useEffect(() => {
        console.log('Category changed to:', selectedCategoryId);
        if (selectedCategoryId) {
            const selectedCategory = categories?.find(cat => cat.categoryId === selectedCategoryId);
            console.log('Selected category:', selectedCategory);
            if (selectedCategory) {
                console.log('Fetching brands for category:', selectedCategory.categoryName);
                dispatch(fetchAdminBrandsByCategory(selectedCategory.categoryName));
                // Reset brand selection when category changes
                setValue('brandId', '');
            }
        } else {
            // If no category selected, fetch all brands as fallback
            console.log('No category selected, fetching all brands');
            dispatch(fetchAdminBrands());
        }
    }, [selectedCategoryId, categories, dispatch, setValue]);

    // Debug brands
    useEffect(() => {
        console.log('Brands updated:', brands);
    }, [brands]);

    // Load all brands when component mounts
    useEffect(() => {
        console.log('ProductForm mounted, loading all brands');
        dispatch(fetchAdminBrands());
    }, [dispatch]);

    const handleFormSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            }
                        })}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                            errors.productName ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter product name"
                    />
                    {errors.productName && (
                        <p className="mt-1 text-sm text-red-600">{errors.productName.message}</p>
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
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                            errors.categoryId ? 'border-red-300' : 'border-gray-300'
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
                        <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-2">
                        Price *
                    </label>
                    <input
                        type="number"
                        id="productPrice"
                        step="0.01"
                        min="0"
                        {...register('productPrice', { 
                            required: 'Price is required',
                            min: {
                                value: 0,
                                message: 'Price must be greater than 0'
                            }
                        })}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                            errors.productPrice ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="0.00"
                    />
                    {errors.productPrice && (
                        <p className="mt-1 text-sm text-red-600">{errors.productPrice.message}</p>
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
                        {...register('productQuantity', { 
                            required: 'Quantity is required',
                            min: {
                                value: 0,
                                message: 'Quantity must be greater than or equal to 0'
                            }
                        })}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                            errors.productQuantity ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="0"
                    />
                    {errors.productQuantity && (
                        <p className="mt-1 text-sm text-red-600">{errors.productQuantity.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="brandId" className="block text-sm font-medium text-gray-700 mb-2">
                        Brand * {brands && `(${brands.length} brands available)`}
                    </label>
                    <select
                        id="brandId"
                        {...register('brandId', { 
                            required: 'Brand is required'
                        })}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                            errors.brandId ? 'border-red-300' : 'border-gray-300'
                        }`}
                    >
                        <option value="">Select a brand</option>
                        {brands?.map((brand) => (
                            <option key={brand.brandId} value={brand.brandId}>
                                {brand.brandName}
                            </option>
                        ))}
                    </select>
                    {errors.brandId && (
                        <p className="mt-1 text-sm text-red-600">{errors.brandId.message}</p>
                    )}
                    {!selectedCategoryId && (
                        <p className="mt-1 text-sm text-gray-500">All brands are shown. You can select a category to filter brands.</p>
                    )}
                    {selectedCategoryId && (!brands || brands.length === 0) && (
                        <p className="mt-1 text-sm text-yellow-600">No brands available for this category</p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                </label>
                <textarea
                    id="productDescription"
                    {...register('productDescription')}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter product description (optional)"
                />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    disabled={isLoading}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
                </button>
            </div>
        </form>
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