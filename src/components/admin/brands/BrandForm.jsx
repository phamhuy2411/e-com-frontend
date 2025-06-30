import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const BrandForm = memo(({ brand, categories, onSubmit, onCancel, isLoading }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        if (brand) {
            reset({
                brandName: brand.brandName || '',
                categoryId: brand.categories?.[0]?.categoryId || '',
            });
        }
    }, [brand, reset]);

    const handleFormSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div>
                <label htmlFor="brandName" className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Name *
                </label>
                <input
                    type="text"
                    id="brandName"
                    {...register('brandName', { 
                        required: 'Brand name is required',
                        minLength: {
                            value: 2,
                            message: 'Brand name must be at least 2 characters'
                        }
                    })}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.brandName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter brand name"
                />
                {errors.brandName && (
                    <p className="mt-1 text-sm text-red-600">{errors.brandName.message}</p>
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
                    {isLoading ? 'Saving...' : (brand ? 'Update Brand' : 'Create Brand')}
                </button>
            </div>
        </form>
    );
});

BrandForm.propTypes = {
    brand: PropTypes.object,
    categories: PropTypes.array,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

BrandForm.displayName = 'BrandForm';

export default BrandForm; 