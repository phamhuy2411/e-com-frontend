import { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AdminProductFilter = memo(({ categories = [], brands = [], onFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [brand, setBrand] = useState('all');

    // Gọi callback khi filter thay đổi
    useEffect(() => {
        onFilterChange({
            keyword: searchTerm,
            category,
            brand,
        });
        // eslint-disable-next-line
    }, [searchTerm, category, brand]);

    // Hàm clear filter
    const handleClear = () => {
        setSearchTerm('');
        setCategory('all');
        setBrand('all');
    };

    return (
        <div className="flex flex-col md:flex-row md:items-end gap-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 relative">
            {/* SEARCH BAR */}
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>
            {/* CATEGORY SELECT */}
            <div className="w-full md:w-56">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    <option value="all">All Categories</option>
                    {categories?.map(cat => (
                        <option key={cat.categoryId} value={cat.categoryName}>{cat.categoryName}</option>
                    ))}
                </select>
            </div>
            {/* BRAND SELECT */}
            <div className="w-full md:w-56">
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <select
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    <option value="all">All Brands</option>
                    {brands?.map(br => (
                        <option key={br.brandId} value={br.brandName}>{br.brandName}</option>
                    ))}
                </select>
            </div>
            {/* CLEAR FILTER BUTTON */}
            <button
                type="button"
                onClick={handleClear}
                className="absolute right-4 top-4 md:static md:ml-4 px-4 py-2 bg-gray-100 hover:bg-orange-100 text-orange-600 font-semibold rounded-lg border border-orange-200 transition-colors duration-150 shadow-sm"
                style={{ minWidth: 120 }}
            >
                Clear Filter
            </button>
        </div>
    );
});

AdminProductFilter.propTypes = {
    categories: PropTypes.array,
    brands: PropTypes.array,
    onFilterChange: PropTypes.func.isRequired,
};

AdminProductFilter.displayName = 'AdminProductFilter';

export default AdminProductFilter; 