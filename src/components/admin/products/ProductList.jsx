import { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import AdminLayout from '../AdminLayout';
import AdminTable from '../shared/AdminTable';
import AdminModal from '../shared/AdminModal';
import ProductForm from './ProductForm';
import { 
    fetchAdminProducts, 
    createAdminProduct, 
    updateAdminProduct, 
    deleteAdminProduct,
    fetchAdminCategories
} from '../../../store/actions/adminActions';

const ProductList = memo(() => {
    const dispatch = useDispatch();
    const { products, categories, brands, isLoading, isButtonLoading } = useSelector((state) => state.admin);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        dispatch(fetchAdminProducts());
        dispatch(fetchAdminCategories());
    }, [dispatch]);

    const handleCreateProduct = () => {
        setSelectedProduct(null);
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDeleteProduct = (product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    const handleSubmitProduct = (data) => {
        if (isEditing && selectedProduct) {
            // Map lại productDescription thành description khi update
            const { productDescription, ...rest } = data;
            const fixedData = { ...rest, description: productDescription };
            dispatch(updateAdminProduct(selectedProduct.productId, fixedData, toast, null, () => setIsModalOpen(false)));
        } else {
            // For creating, we need both categoryId and brandId
            if (data.categoryId && data.brandId) {
                // Remove categoryId and brandId from productData to avoid duplication
                const { categoryId, brandId, productDescription, ...productData } = data;
                const fixedProductData = { ...productData, description: productDescription };
                dispatch(createAdminProduct(categoryId, brandId, fixedProductData, toast, null, () => setIsModalOpen(false)));
            } else {
                toast.error('Please select both category and brand');
            }
        }
    };

    const handleConfirmDelete = () => {
        if (selectedProduct) {
            dispatch(deleteAdminProduct(selectedProduct.productId, toast, () => setIsDeleteModalOpen(false)));
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    const tableHeaders = ['ID', 'Image', 'Name', 'Category', 'Price', 'Quantity', 'Brand', 'Actions'];

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                        <p className="text-gray-600">Manage your products</p>
                    </div>
                    <button
                        onClick={handleCreateProduct}
                        className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors duration-200"
                    >
                        <FiPlus size={16} />
                        <span>Add Product</span>
                    </button>
                </div>

                {/* Products Table */}
                <AdminTable 
                    headers={tableHeaders} 
                    isLoading={isLoading}
                    emptyMessage="No products found"
                >
                    {products?.map((product) => (
                        <tr key={product.productId} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {product.productId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <img
                                    src={product.productImage || '/placeholder-image.png'}
                                    alt={product.productName}
                                    className="h-12 w-12 rounded-lg object-cover"
                                    onError={(e) => {
                                        e.target.src = '/placeholder-image.png';
                                    }}
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {product.productName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {product.category?.categoryName || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatPrice(product.productPrice)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    product.productQuantity > 0 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {product.productQuantity}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {product.brand?.brandName || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEditProduct(product)}
                                        className="text-orange-600 hover:text-orange-900 transition-colors duration-200"
                                        title="Edit product"
                                    >
                                        <FiEdit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProduct(product)}
                                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                        title="Delete product"
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
                    title={isEditing ? 'Edit Product' : 'Create New Product'}
                    size="xl"
                >
                    <ProductForm
                        product={selectedProduct}
                        categories={categories}
                        brands={brands}
                        onSubmit={handleSubmitProduct}
                        onCancel={() => setIsModalOpen(false)}
                        isLoading={isButtonLoading}
                    />
                </AdminModal>

                {/* Delete Confirmation Modal */}
                <AdminModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    title="Delete Product"
                    size="sm"
                >
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            Are you sure you want to delete the product &quot;{selectedProduct?.productName}&quot;? 
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

ProductList.displayName = 'ProductList';

export default ProductList; 