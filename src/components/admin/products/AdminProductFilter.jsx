import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import PropTypes from 'prop-types';
import { memo } from 'react';

const AdminProductFilter = memo(({ categories = [], brands = [], onFilterChange, initialFilter = {} }) => {
    const [category, setCategory] = useState(initialFilter.category || "all");
    const [brand, setBrand] = useState(initialFilter.brand || "all");
    const [searchTerm, setSearchTerm] = useState(initialFilter.keyword || "");

    // Gửi filter lên parent mỗi khi thay đổi
    useEffect(() => {
        onFilterChange({
            category,
            brand,
            keyword: searchTerm,
        });
        // eslint-disable-next-line
    }, [category, brand, searchTerm]);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        setBrand("all"); // Reset brand khi đổi category
    };

    const handleBrandChange = (event) => {
        setBrand(event.target.value);
    };

    // Lọc brands theo category nếu cần
    const filteredBrands = category === "all"
        ? brands
        : brands.filter(b => b.categoryName === (categories.find(c => c.categoryId === category)?.categoryName));

    return (
        <div className="flex flex-col md:flex-row gap-4 w-full items-center bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-2">
            {/* SEARCH BAR */}
            <div className="relative flex items-center w-full md:w-1/3">
                <FiSearch className="absolute left-4 text-gray-400" size={20} aria-hidden="true" />
                <input 
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 bg-transparent border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm font-medium"
                    aria-label="Search products"
                />
            </div>
            {/* CATEGORY SELECTION */}
            <FormControl
                className="w-full md:w-1/4"
                variant="outlined"
                size="small">
                <Select
                    value={category}
                    onChange={handleCategoryChange}
                    className="w-full text-gray-700 bg-gray-50 border-gray-200 rounded-lg"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#e5e7eb',
                            },
                            '&:hover fieldset': {
                                borderColor: '#f97316',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#f97316',
                            },
                        },
                        '& .MuiSelect-select': {
                            padding: '10px 14px',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                        },
                    }}
                    aria-label="Select category"
                >
                    <MenuItem value="all" className="text-gray-600 font-medium">All Categories</MenuItem>
                    {categories?.map((item) => (
                        <MenuItem key={item.categoryId} value={item.categoryId} className="text-gray-700 font-medium">
                            {item.categoryName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {/* BRAND SELECTION */}
            <FormControl
                className="w-full md:w-1/4"
                variant="outlined"
                size="small">
                <Select
                    value={brand}
                    onChange={handleBrandChange}
                    className="w-full text-gray-700 bg-gray-50 border-gray-200 rounded-lg"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#e5e7eb',
                            },
                            '&:hover fieldset': {
                                borderColor: '#f97316',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#f97316',
                            },
                        },
                        '& .MuiSelect-select': {
                            padding: '10px 14px',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                        },
                    }}
                    aria-label="Select brand"
                >
                    <MenuItem value="all" className="text-gray-600 font-medium">All Brands</MenuItem>
                    {filteredBrands?.map((item) => (
                        <MenuItem key={item.brandId} value={item.brandId} className="text-gray-700 font-medium">
                            {item.brandName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
});

AdminProductFilter.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            categoryName: PropTypes.string.isRequired,
        })
    ),
    brands: PropTypes.arrayOf(
        PropTypes.shape({
            brandId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            brandName: PropTypes.string.isRequired,
            categoryName: PropTypes.string,
        })
    ),
    onFilterChange: PropTypes.func.isRequired,
    initialFilter: PropTypes.object,
};

AdminProductFilter.displayName = 'AdminProductFilter';

export default AdminProductFilter; 