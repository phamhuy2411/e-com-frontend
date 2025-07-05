import { memo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FiPackage, FiGrid, FiUsers, FiDollarSign } from 'react-icons/fi';
import AdminLayout from '../AdminLayout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAdminCategories, fetchAdminProducts } from '../../../store/actions/adminActions';
// import { fetchAdminCategories } from '../../../store/actions/adminActions';
// import { fetchAdminProducts } from '../../../store/actions/adminActions';

const BACKEND_URL = import.meta.env.VITE_BACK_END_URL;
const getImageUrl = (img) => {
  if (!img) return '/placeholder-image.png';
  if (img.startsWith('http://') || img.startsWith('https://')) return img;
  if (img.startsWith('/images/')) return `${BACKEND_URL}${img}`;
  return `${BACKEND_URL}/images/${img}`;
};
const StatsCard = memo(({ title, value, icon: Icon, color, change }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon className="text-white" size={24} />
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                {change && (
                    <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {change > 0 ? '+' : ''}{change}% from last month
                    </p>
                )}
            </div>
        </div>
    </div>
));

StatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.elementType.isRequired,
    color: PropTypes.string.isRequired,
    change: PropTypes.number,
};

StatsCard.displayName = 'StatsCard';

const AdminDashboard = memo(() => {
    const { categories, products } = useSelector((state) => state.admin);
    const dispatch = useDispatch(); // ✅ BỔ SUNG DÒNG NÀY

    useEffect(() => {
        dispatch(fetchAdminCategories());
        dispatch(fetchAdminProducts());
    }, [dispatch]);

    const stats = [
        {
            title: 'Total Products',
            value: products?.length || 0,
            icon: FiPackage,
            color: 'bg-blue-500',
            change: 12,
        },
        {
            title: 'Total Categories',
            value: categories?.length || 0,
            icon: FiGrid,
            color: 'bg-green-500',
            change: 5,
        },
        {
            title: 'Total Users',
            value: 'N/A',
            icon: FiUsers,
            color: 'bg-purple-500',
            change: null,
        },
        {
            title: 'Total Revenue',
            value: 'N/A',
            icon: FiDollarSign,
            color: 'bg-orange-500',
            change: null,
        },
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600">Welcome to your admin dashboard</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatsCard key={index} {...stat} />
                    ))}
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Products */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Recent Products</h3>
                        </div>
                        <div className="p-6">
                            {products?.slice(0, 5).map((product) => (
                                <div key={product.productId} className="flex items-center space-x-3 py-2">
                                    {console.log("Image:", product.productImage)}
                                    <img
  src={getImageUrl(product.image)}
  alt={product.productName}
  className="h-10 w-10 rounded-lg object-cover"
  onError={(e) => {
    e.target.src = '/placeholder-image.png';
  }}
/>

                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{product.productName}</p>
                                        <p className="text-sm text-gray-500">${product.productPrice}</p>
                                    </div>
                                </div>
                            ))}
                            {(!products || products.length === 0) && (
                                <p className="text-gray-500 text-sm">No products found</p>
                            )}
                        </div>
                    </div>

                    {/* Recent Categories */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Recent Categories</h3>
                        </div>
                        <div className="p-6">
                            {categories?.slice(0, 5).map((category) => (
                                <div key={category.categoryId} className="flex items-center space-x-3 py-2">
                                    <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <FiGrid className="text-orange-600" size={16} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{category.categoryName}</p>
                                        <p className="text-sm text-gray-500">
                                            {category.categoryDescription || 'No description'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {(!categories || categories.length === 0) && (
                                <p className="text-gray-500 text-sm">No categories found</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
});

AdminDashboard.displayName = 'AdminDashboard';

export default AdminDashboard; 