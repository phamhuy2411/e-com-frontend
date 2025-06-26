import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const CategoryForm = memo(({ category, onSubmit, onCancel, isLoading }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        if (category) {
            reset({
                categoryName: category.categoryName || '',
                categoryDescription: category.categoryDescription || '',
            });
        }
    }, [category, reset]);

    const handleFormSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div>
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name *
                </label>
                <input
                    type="text"
                    id="categoryName"
                    {...register('categoryName', { 
                        required: 'Category name is required',
                        minLength: {
                            value: 2,
                            message: 'Category name must be at least 2 characters'
                        }
                    })}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errors.categoryName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter category name"
                />
                {errors.categoryName && (
                    <p className="mt-1 text-sm text-red-600">{errors.categoryName.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                </label>
                <textarea
                    id="categoryDescription"
                    {...register('categoryDescription')}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter category description (optional)"
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
                    {isLoading ? 'Saving...' : (category ? 'Update Category' : 'Create Category')}
                </button>
            </div>
        </form>
    );
});

CategoryForm.propTypes = {
    category: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

CategoryForm.displayName = 'CategoryForm';

export default CategoryForm; 