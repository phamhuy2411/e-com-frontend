import { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import AdminLayout from '../AdminLayout';
import AdminTable from '../shared/AdminTable';
import AdminModal from '../shared/AdminModal';
import BrandForm from './BrandForm';
import { 
    fetchAdminBrands, 
    fetchAdminCategories,
    createAdminBrand,
    updateAdminBrand,
    deleteAdminBrand
} from '../../../store/actions/adminActions';

const BrandList = memo(() => {
    const dispatch = useDispatch();
    const { brands, categories, isLoading, isButtonLoading } = useSelector((state) => state.admin);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        dispatch(fetchAdminBrands());
        dispatch(fetchAdminCategories());
    }, [dispatch]);

    const handleCreateBrand = () => {
        setSelectedBrand(null);
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const handleEditBrand = (brand) => {
        setSelectedBrand(brand);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDeleteBrand = (brand) => {
        setSelectedBrand(brand);
        setIsDeleteModalOpen(true);
    };

    const handleSubmitBrand = (data) => {
        if (isEditing && selectedBrand) {
            dispatch(updateAdminBrand(selectedBrand.brandId, data, toast, () => setIsModalOpen(false), setIsModalOpen));
        } else {
            dispatch(createAdminBrand(data, toast, () => setIsModalOpen(false), setIsModalOpen));
        }
    };

    const handleConfirmDelete = () => {
        dispatch(deleteAdminBrand(selectedBrand.brandId, toast, setIsDeleteModalOpen));
    };

    const tableHeaders = ['ID', 'Name', 'Category', 'Actions'];

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Brands</h1>
                        <p className="text-gray-600">Manage your product brands</p>
                    </div>
                    <button
                        onClick={handleCreateBrand}
                        className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors duration-200"
                    >
                        <FiPlus size={16} />
                        <span>Add Brand</span>
                    </button>
                </div>

                {/* Brands Table */}
                <AdminTable 
                    headers={tableHeaders} 
                    isLoading={isLoading}
                    emptyMessage="No brands found"
                >
                    {brands?.map((brand) => (
                        <tr key={brand.brandId} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {brand.brandId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {brand.brandName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {brand.categories && brand.categories.length > 0
                                    ? brand.categories.map(cat => cat.categoryName).join(', ')
                                    : 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEditBrand(brand)}
                                        className="text-orange-600 hover:text-orange-900 transition-colors duration-200"
                                        title="Edit brand"
                                    >
                                        <FiEdit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBrand(brand)}
                                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                        title="Delete brand"
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
                    title={isEditing ? 'Edit Brand' : 'Create New Brand'}
                    size="md"
                >
                    <BrandForm
                        brand={selectedBrand}
                        categories={categories}
                        onSubmit={handleSubmitBrand}
                        onCancel={() => setIsModalOpen(false)}
                        isLoading={isButtonLoading}
                    />
                </AdminModal>

                {/* Delete Confirmation Modal */}
                <AdminModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    title="Delete Brand"
                    size="sm"
                >
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            Are you sure you want to delete the brand &quot;{selectedBrand?.brandName}&quot;? 
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

BrandList.displayName = 'BrandList';

export default BrandList; 