import { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import AdminLayout from '../AdminLayout';
import AdminTable from '../shared/AdminTable';
import AdminModal from '../shared/AdminModal';
import CategoryForm from './CategoryForm';
import { 
    fetchAdminCategories, 
    createAdminCategory, 
    updateAdminCategory, 
    deleteAdminCategory 
} from '../../../store/actions/adminActions';

const CategoryList = memo(() => {
    const dispatch = useDispatch();
    const { categories, isLoading, isButtonLoading } = useSelector((state) => state.admin);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        dispatch(fetchAdminCategories());
    }, [dispatch]);

    const handleCreateCategory = () => {
        setSelectedCategory(null);
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const handleEditCategory = (category) => {
        setSelectedCategory(category);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDeleteCategory = (category) => {
        setSelectedCategory(category);
        setIsDeleteModalOpen(true);
    };

    const handleSubmitCategory = (data) => {
        if (isEditing && selectedCategory) {
            dispatch(updateAdminCategory(selectedCategory.categoryId, data, toast, null, () => setIsModalOpen(false)));
        } else {
            dispatch(createAdminCategory(data, toast, null, () => setIsModalOpen(false)));
        }
    };

    const handleConfirmDelete = () => {
        if (selectedCategory) {
            dispatch(deleteAdminCategory(selectedCategory.categoryId, toast, () => setIsDeleteModalOpen(false)));
        }
    };

    const tableHeaders = ['ID', 'Name', 'Description', 'Actions'];

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                        <p className="text-gray-600">Manage your product categories</p>
                    </div>
                    <button
                        onClick={handleCreateCategory}
                        className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors duration-200"
                    >
                        <FiPlus size={16} />
                        <span>Add Category</span>
                    </button>
                </div>

                {/* Categories Table */}
                <AdminTable 
                    headers={tableHeaders} 
                    isLoading={isLoading}
                    emptyMessage="No categories found"
                >
                    {categories?.map((category) => (
                        <tr key={category.categoryId} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {category.categoryId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {category.categoryName}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                {category.categoryDescription || 'No description'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEditCategory(category)}
                                        className="text-orange-600 hover:text-orange-900 transition-colors duration-200"
                                        title="Edit category"
                                    >
                                        <FiEdit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCategory(category)}
                                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                        title="Delete category"
                                    >
                                        <FiTrash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </AdminTable>

                {/* Create/Edit Modal */}
                <AdminModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={isEditing ? 'Edit Category' : 'Create New Category'}
                    size="md"
                >
                    <CategoryForm
                        category={selectedCategory}
                        onSubmit={handleSubmitCategory}
                        onCancel={() => setIsModalOpen(false)}
                        isLoading={isButtonLoading}
                    />
                </AdminModal>

                {/* Delete Confirmation Modal */}
                <AdminModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    title="Delete Category"
                    size="sm"
                >
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            Are you sure you want to delete the category &quot;{selectedCategory?.categoryName}&quot;? 
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                disabled={isButtonLoading}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 disabled:opacity-50"
                            >
                                {isButtonLoading ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </AdminModal>
            </div>
        </AdminLayout>
    );
});

CategoryList.displayName = 'CategoryList';

export default CategoryList; 